import { useEffect, useRef, useState } from "react";

/**
 * **PROPERTIES OF APP HOOK (UseCardsCarouselProps):**
 *
 * Propiedades de configuración del carrusel.
 *
 * - `total` (**required**) -> número total de ítems del carrusel.
 * - `cardWidth` (px) -> ancho máximo de la tarjeta central. Default: `560`.
 * - `gap` (px) -> separación horizontal base entre tarjetas vecinas. Default: `64`.
 * - `depth` (px) -> profundidad Z por paso respecto al centro. Default: `120`.
 * - `tilt` (deg) -> rotación Y por paso (efecto “coverflow”). Default: `14`.
 * - `sideCounts.left` -> tarjetas visibles a la **izquierda**. Si no se define, el hook calcula 2/1/0 de forma responsiva.
 * - `sideCounts.right` -> tarjetas visibles a la **derecha**. Si no se define, el hook calcula 2/1/0 de forma responsiva.
 *   > Suma visible = `left + 1 (centro) + right`.
 */
export interface UseCardsCarouselProps {
  total: number;
  cardWidth?: number;
  gap?: number;
  depth?: number;
  tilt?: number;
  sideCounts?: {
    left?: number;
    right?: number;
  };
}

/**
 * **DESCRIPTION:**
 *
 * Interfaz de retorno del hook con estado, acciones, gestos y helpers de layout 3D,
 * además de soporte **circular** (wrap-around). Si no se provee `sideCounts`,
 * el hook ajusta dinámicamente cuántas tarjetas muestra por lado (2 / 1 / 0)
 * atendiendo al ancho del **viewport** (`window.innerWidth`).
 *
 * **RETURNS:**
 * - `current` -> índice centrado (0..total-1).
 * - `next()` / `prev()` / `goTo(i)` -> acciones de navegación.
 * - `onPointerDown/Move/Up` -> handlers para drag con mouse/touch.
 * - `getStyleForOffset(k)` -> estilos 3D para el **offset** `k` (k∈[-left..right], 0 = centro).
 * - `offsetWindow` -> array de offsets visibles en orden de render.
 * - `indexAtOffset(k)` -> indice real del ítem que está en el offset `k` con wrap.
 * - `isCenterIndex(i)` -> `true` si `i` es el índice centrado.
 * - `cardWidth` -> ancho máximo efectivo.
 */
export interface UseCardsCarouselReturn {
  current: number;
  next: () => void;
  prev: () => void;
  goTo: (i: number) => void;

  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;

  getStyleForOffset: (k: number) => {
    transform: string;
    zIndex: number;
    opacity: number;
    maxWidth: number;
  };

  /** offsets visibles: [-left, ..., -1, 0, 1, ..., right] */
  offsetWindow: number[];

  /** índice real (0..total-1) que corresponde al offset `k` desde `current` */
  indexAtOffset: (k: number) => number;

  /** utilidad para saber si un índice real es el centro */
  isCenterIndex: (i: number) => boolean;

  cardWidth: number;
}

/** Heurística responsive: 2 por lado si hay ancho, si no 1, si no 0 */
function computeResponsiveSidePerSide(
  viewportWidth: number,
  cardWidth: number,
  gap: number
): 0 | 1 | 2 | 3 | 4 {
  // margen para botones/sombras/laterales
  const padding = 56; // por lado
  const usable = Math.max(0, viewportWidth - padding * 2);

  // coste horizontal aproximado de una tarjeta lateral (hay solape visual)
  const perSideUnit = cardWidth * 0.6 + gap;

  // centro ocupa ~cardWidth; comprobamos si caben 2 o 1 por lado
  if (usable >= cardWidth + perSideUnit * 4) return 4; // 4 por lado
  if (usable >= cardWidth + perSideUnit * 3) return 3; // 3 por lado
  if (usable >= cardWidth + perSideUnit * 2) return 2; // 2 por lado
  if (usable >= cardWidth + perSideUnit * 1) return 1; // 1 por lado
  return 0; // solo centro
}

/**
 * **DESCRIPTION:**
 *
 * `useCardsCarousel` gestiona la interacción y el layout *coverflow* en modo
 * **circular** (wrap-around), manteniendo siempre una ventana visible fija:
 * `left` tarjetas a la izquierda, `1` centrada y `right` a la derecha.
 *
 * - Si `sideCounts` no se pasa, se calcula automáticamente (2/1/0 por lado)
 *   usando el ancho del viewport y una heurística basada en `cardWidth` y `gap`.
 * - Navegación por **teclado** (← →) y **drag** (mouse/touch) con umbral.
 * - Cálculo de transformaciones CSS 3D por **offset relativo** (no por índice).
 * - Mapeo circular índice↔offset mediante módulo (`% total`).
 *
 * **EXAMPLE OF USE:**
 * @example
 * const api = useCardsCarousel({ total: items.length }); // responsive 2/1/0
 * // o fijo:
 * // const api = useCardsCarousel({ total: items.length, sideCounts: { left: 2, right: 2 } });
 */
export const useCardsCarousel = ({
  total,
  cardWidth = 420,
  gap = 32,
  depth = 120,
  tilt = 14,
  sideCounts,
}: UseCardsCarouselProps): UseCardsCarouselReturn => {
  // estado del índice centrado
  const [current, setCurrent] = useState(0);

  // estado de sideCounts (solo se usa si no te pasan uno fijo)
  const [autoSides, setAutoSides] = useState<{ left: 0 | 1 | 2 | 3 | 4; right: 0 | 1 | 2 | 3 | 4 }>(() => {
    const s = computeResponsiveSidePerSide(typeof window !== "undefined" ? window.innerWidth : 0, cardWidth, gap);
    return { left: s, right: s };
  });

  // si el dev nos pasa sideCounts, lo respetamos; si no, usamos auto
  const left = sideCounts?.left ?? autoSides.left;
  const right = sideCounts?.right ?? autoSides.right;

  // recalcular en resize solo si NO viene sideCounts fijo
  useEffect(() => {
    if (sideCounts) return;
    const onResize = () => {
      const s = computeResponsiveSidePerSide(window.innerWidth, cardWidth, gap);
      setAutoSides({ left: s, right: s });
    };
    onResize(); // inicial
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sideCounts, cardWidth, gap]);

  const wrap = (i: number) => {
    if (total <= 0) return 0;
    return ((i % total) + total) % total;
  };

  const next = () => setCurrent((i) => wrap(i + 1));
  const prev = () => setCurrent((i) => wrap(i - 1));
  const goTo = (i: number) => setCurrent(wrap(i));

  // teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // drag
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragAccum = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.((e as any).pointerId);
    isDragging.current = true;
    dragStartX.current = (e as any).clientX ?? 0;
    dragAccum.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const clientX = (e as any).clientX ?? 0;
    const dx = clientX - dragStartX.current;
    dragStartX.current = clientX;
    dragAccum.current += dx;

    const threshold = (cardWidth + gap) * 0.35;
    if (dragAccum.current > threshold) {
      prev();
      dragAccum.current = 0;
    } else if (dragAccum.current < -threshold) {
      next();
      dragAccum.current = 0;
    }
  };

  const onPointerUp = () => {
    isDragging.current = false;
    dragAccum.current = 0;
  };

  // offsets visibles fijos: [-left..-1] + [0] + [1..right]
  const offsetWindow = [
    ...Array.from({ length: left }, (_, i) => -left + i), // -left .. -1
    0,
    ...Array.from({ length: right }, (_, i) => i + 1),    // 1 .. right
  ];

  const indexAtOffset = (k: number) => wrap(current + k);

  const getStyleForOffset: UseCardsCarouselReturn["getStyleForOffset"] = (k) => {
    const abs = Math.abs(k);

    const translateX = k * (gap + cardWidth * 0.32);
    const translateZ = -abs * depth;
    const rotateY = -k * tilt;
    const scale = Math.max(0.82, 1 - abs * 0.08);

    const zIndex = 1000 - abs;
    const opacity = Math.max(0.25, 1 - abs * 0.18);

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
      maxWidth: cardWidth,
    };
  };

  const isCenterIndex = (i: number) => wrap(i) === current;

  return {
    current,
    next,
    prev,
    goTo,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    getStyleForOffset,
    offsetWindow,
    indexAtOffset,
    isCenterIndex,
    cardWidth,
  };
};
