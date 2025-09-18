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
 * - `tilt` (deg) -> rotación Y por paso x(efecto “coverflow”). Default: `14`.
 * - `sideCounts.left` -> número de tarjetas visibles a la **izquierda**. Default: `2`.
 * - `sideCounts.right` -> número de tarjetas visibles a la **derecha**. Default: `2`.
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
 * además de soporte **circular** para que siempre se muestren `left` a la izquierda,
 * `right` a la derecha y `1` en el centro (con wrap-around por índices).
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

/**
 * **DESCRIPTION:**
 *
 * `useCardsCarousel` gestiona la interacción y el layout *coverflow* en modo
 * **circular** (wrap-around), manteniendo siempre una ventana visible fija:
 * `left` tarjetas a la izquierda, `1` centrada y `right` a la derecha.
 *
 * - Navegación por **teclado** (← →) y **drag** (mouse/touch) con umbral.
 * - Cálculo de transformaciones CSS 3D por **offset relativo** (no por índice).
 * - Mapeo circular índice↔offset mediante módulo (`% total`).
 *
 * **EXAMPLE OF USE:**
 * @example
 * const api = useCardsCarousel({ total: items.length, sideCounts: { left: 4, right: 3 } });
 * const offsets = api.offsetWindow; // [-4,-3,-2,-1,0,1,2,3]
 * return offsets.map(k => {
 *   const idx = api.indexAtOffset(k);
 *   return <div key={idx} style={api.getStyleForOffset(k)}>{renderItem(idx)}</div>;
 * });
 */
export const useCardsCarousel = ({
  total,
  cardWidth = 560,
  gap = 64,
  depth = 120,
  tilt = 14,
  sideCounts = { left: 2, right: 2 },
}: UseCardsCarouselProps): UseCardsCarouselReturn => {
  const left = sideCounts.left ?? 2;
  const right = sideCounts.right ?? 2;

  const [current, setCurrent] = useState(0);

  const wrap = (i: number) => {
    if (total <= 0) return 0;
    // módulo positivo
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
    ...Array.from({ length: right }, (_, i) => i + 1), // 1 .. right
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
