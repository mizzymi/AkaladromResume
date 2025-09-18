import { useCardsCarousel } from '../../hooks/useCardsCarousel/useCardsCarousel';
import { type FC } from 'react';
import './CardsCarousel.css';

/**
 * **PROPERTIES OF APP COMPONENT:**
 * 
 * - `items`: elementos a renderizar. Deben tener `id` y un `render(isCenter)`.
 * - `cardWidth`, `gap`, `depth`, `tilt`: tuning visual.
 * - `sideCounts`: `{ left: 4, right: 3 }` por defecto para el círculo 4-1-3.
 * - `onSelect`: callback al hacer click cuando el item está centrado.
 */
interface CardsCarouselProps {
  items: Array<{ id: string; render: (isCenter: boolean) => React.ReactNode }>;
  cardWidth?: number;
  gap?: number;
  depth?: number;
  tilt?: number;
  sideCounts?: { left?: number; right?: number };
  onSelect?: (id: string, index: number) => void;
}

/**
 * **DESCRIPTION:**
 * 
 * Carrusel *coverflow* **circular**: siempre se renderizan 4 a la izquierda,
 * 1 en el centro y 3 a la derecha (configurable vía `sideCounts`).
 * Soporta mouse/touch drag, flechas del teclado y botones de navegación.
 * 
 * **EXAMPLE OF USE:**
 * @example
 * <CardsCarousel
 *   items={pillars.map(p => ({
 *     id: p.key,
 *     render: (isCenter) => <MyCard pillar={p} isCenter={isCenter} />
 *   }))}
 *   onSelect={(id) => navigate('/' + id)}
 * />
 */
export const CardsCarousel: FC<CardsCarouselProps> = ({
  items,
  cardWidth,
  gap,
  depth,
  tilt,
  sideCounts,
  onSelect,
}) => {

  const {
    next, prev, goTo,
    onPointerDown, onPointerMove, onPointerUp,
    getStyleForOffset, offsetWindow, indexAtOffset, isCenterIndex, cardWidth: cw
  } = useCardsCarousel({
    total: items.length,
    cardWidth, gap, depth, tilt, sideCounts
  });

  return (
    <div data-testid='CardsCarousel-Component' className="cc-wrapper">
      <button
        className="cc-nav cc-nav--left"
        type="button"
        aria-label="Anterior"
        onClick={prev}
      >◀</button>

      <div
        className="cc-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="cc-track" style={{ height: Math.max(320, (cw ?? 560) * 0.6) }}>
          {offsetWindow.map((k) => {
            const idx = indexAtOffset(k);
            const it = items[idx];
            const center = isCenterIndex(idx);
            return (
              <div
                key={`${idx}-${k}`}
                className="cc-card"
                style={getStyleForOffset(k)}
                onClick={(e) => {
                  if (!center) {
                    e.preventDefault();
                    goTo(idx);
                  } else {
                    onSelect?.(it.id, idx);
                  }
                }}
              >
                {it.render(center)}
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="cc-nav cc-nav--right"
        type="button"
        aria-label="Siguiente"
        onClick={next}
      >▶</button>
    </div>
  );
};
