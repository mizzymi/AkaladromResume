import { type FC, useMemo } from "react";
import { useCardsContainer } from "../../hooks/useCardsContainer/useCardsContainer";
import { useTranslations } from "../../hooks/useTranslations/useTranslations";
import { Cards } from "../Cards/Cards";
import { getPillarImage } from "../../assets/pillars";
import "./CardsContainer.css";
import { useNavigate } from "react-router-dom";
import { CardsCarousel } from "../CardsCarousel/CardsCarousel";

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
  const { t } = useTranslations({});
  const navigate = useNavigate();

  const sortedPillars = useMemo(
    () => order.map((k) => pillars.find((p) => p.key === k)).filter(Boolean)!,
    [order, pillars]
  );

  return (
    <div data-testid="CardsContainer-Component" className="CardsContainer">
      <CardsCarousel
        items={sortedPillars.map((p) => ({
          id: p!.key,
          render: (isCenter) => (
            <Cards interactive={false} className={`pillar-card ${isCenter ? "is-center" : ""}`}>
              <div className="card__media pillar-media">
                <img
                  className="pillar-img"
                  src={getPillarImage(p!.key)}
                  alt={t(`pillars.${p!.key}.label`)}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card__content">
                <div className="card__title">{t(`pillars.${p!.key}.label`)}</div>
                <div className="card__subtitle">{t("ui.pillarSubtitle")}</div>
                {t(`pillars.${p!.key}.desc`) ? (
                  <div className="card__body">{t(`pillars.${p!.key}.desc`)}</div>
                ) : null}
              </div>
            </Cards>
          )
        }))}
        onSelect={(id) => navigate(`/${id}`)}
      />
    </div>
  );
};