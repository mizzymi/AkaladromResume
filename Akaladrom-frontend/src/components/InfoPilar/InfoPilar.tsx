import { type FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslations } from "../../hooks/useTranslations/useTranslations";
import { useInfoPilar } from "../../hooks/useInfoPilar/useInfoPilar";
import "./InfoPilar.css";

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * - `id` (optional): 0..7 (0: Anemo ... 7: Veneno). If omitted, tries to read from `:id`.
 */
interface InfoPilarProps {
  id?: number;
}

/**
 * **DESCRIPTION:**
 *
 * Reusable, localized pillar page. Renders:
 * - Pillar header: image + localized name (from `pillars.<Key>.label`)
 * - Localized pilar description (`pillars.<Key>.desc`)
 * - Continent (name/desc) from `continents.<Continent>.{name,desc}`
 * - Pueblos (razas) y Raza principal (`races.<Race>.{label,desc}`)
 * - Clases principales (`classes.<Class>.label`)
 *
 * **EXAMPLE OF USE:**
 * @example
 * <InfoPilar id={4} /> // Geo
 * // or route: /pillar/:id  (0..7)
 */
export const InfoPilar: FC<InfoPilarProps> = ({ id }) => {
  const params = useParams();
  const { t } = useTranslations({});
  const resolvedId = useMemo(() => {
    if (typeof id === "number") return id;
    const fromRoute = Number(params.id);
    return Number.isFinite(fromRoute) ? Math.max(0, Math.min(7, fromRoute)) : 0;
  }, [id, params.id]);
  
  const info = useInfoPilar({ id: resolvedId });
  const pillarName = t(`pillars.${info.key}.label`);
  const pillarDesc = t(`pillars.${info.key}.desc`);
  const continentName = t(`continents.${info.continentKey}.name`);
  const continentDesc = t(`continents.${info.continentKey}.desc`);

  return (
    <article
      className="InfoPilar"
      data-testid="InfoPilar-Component"
      style={{ borderLeftColor: info.color }}
    >
      {/* Header */}
      <header className="InfoPilar__header">
        <div className="InfoPilar__media" aria-hidden>
          <img
            src={info.imageSrc}
            alt={pillarName}
            className="InfoPilar__img"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="InfoPilar__title">
          <h1 className="InfoPilar__name">{pillarName}</h1>
          <span
            className="InfoPilar__chip"
            style={{ background: info.color }}
            aria-hidden
          />
        </div>
      </header>

      {/* Breve sinopsis del pilar */}
      {pillarDesc && (
        <section className="InfoPilar__card">
          <h2 className="InfoPilar__subtitle">{t("ui.pillarSubtitle")}</h2>
          <p>{pillarDesc}</p>
        </section>
      )}

      {/* Grid principal */}
      <section className="InfoPilar__grid">
        {/* Continente */}
        <div className="InfoPilar__card">
          <h2 className="InfoPilar__subtitle">{t("ui.regionSubtitle")}</h2>
          <p><strong>{continentName}</strong></p>
          {continentDesc && <p>{continentDesc}</p>}
        </div>

        {/* Pueblos (razas relevantes) */}
        <div className="InfoPilar__card">
          <h2 className="InfoPilar__subtitle">{t("ui.raceSubtitle")}</h2>
          <ul className="InfoPilar__list">
            {info.peoples.map((r) => (
              <li key={r}>
                <strong>{t(`races.${r}.label`)}</strong>
              </li>
            ))}
          </ul>
        </div>

        {/* Raza principal (con descripción) */}
        <div className="InfoPilar__card">
          <h2 className="InfoPilar__subtitle">
            {t("races.titleMain") || t("ui.raceSubtitle")}
          </h2>
          <p><strong>{t(`races.${info.mainRace}.label`)}</strong></p>
          <p>{t(`races.${info.mainRace}.desc`)}</p>
        </div>

        {/* Clases principales */}
        <div className="InfoPilar__card">
          <h2 className="InfoPilar__subtitle">{t("ui.classSubtitle")}</h2>
          <ul className="InfoPilar__tags">
            {info.classes.map((c) => (
              <li key={c} className="InfoPilar__tag">
                {t(`classes.${c}.label`)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
};
