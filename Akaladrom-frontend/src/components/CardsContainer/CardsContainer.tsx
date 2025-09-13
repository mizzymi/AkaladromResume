import { type FC, useMemo } from "react";
import { useCardsContainer } from "../../hooks/useCardsContainer/useCardsContainer";
import { useTranslations } from "../../hooks/useTranslations/useTranslations";
import { Cards } from "../Cards/Cards";
import { getPillarImage } from "../../assets/pillars";
import "./CardsContainer.css";

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * This interface currently has 0 properties. If you add any property
 * you must document it and type it correctly for the usability of
 * the component.
 */
interface CardsContainerProps { }

/**
 * **DESCRIPTION:**
 *
 * Renders ALL Akaladrom pillars as cards in a responsive grid (no selection UI, no emojis).
 * Texts (title/subtitle/description) are retrieved using the `useTranslations` hook:
 * - Title  -> t(`pillars.${key}.label`)
 * - Subtitle -> t("ui.pillarSubtitle")
 * - Description -> t(`pillars.${key}.desc`)
 *
 * **EXAMPLE OF USE:**
 * @example
 * return <CardsContainer />;
 */
export const CardsContainer: FC<CardsContainerProps> = ({ }) => {
  const { order, pillars } = useCardsContainer({});
  const { t } = useTranslations({}); // 👈 tu hook tal cual

  const sortedPillars = useMemo(
    () => order.map((k) => pillars.find((p) => p.key === k)).filter(Boolean),
    [order, pillars]
  );

  return (
    <div data-testid="CardsContainer-Component" className="CardsContainer">
      <div className="cards-grid">
        {sortedPillars.map((p) => {
          const pillar = p!;
          const key = pillar.key;
          const label = t(`pillars.${key}.label`);
          const subtitle = t("ui.pillarSubtitle");
          const desc = t(`pillars.${key}.desc`);
          const imgSrc = getPillarImage(key);

          return (
            <Cards key={key} interactive={false} className="pillar-card">
              <>
                <div className="card__media pillar-media">
                  <img
                    className="pillar-img"
                    src={imgSrc}
                    alt={label}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="card__content">
                  <div className="card__title">{label}</div>
                  <div className="card__subtitle">{subtitle}</div>
                  {desc ? <div className="card__body">{desc}</div> : null}
                </div>
              </>
            </Cards>
          );
        })}
      </div>
    </div>
  );
};
