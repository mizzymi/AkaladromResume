import { useMemo } from "react";
import {
  AK_PILLARS_ORDER,
  type AkaladromPillar,
  getPillar,
} from "../../domain/pillars";
import { getPillarImage } from "../../assets/pillars";

/**
 * **DESCRIPTION:**
 *
 * With this interface we can define the properties that the `useInfoPilar`
 * custom hook needs. You can pass an `id` (0..7) or directly a `pillarKey`.
 * If both are provided, `pillarKey` takes precedence.
 */
export interface UseInfoPilarProps {
  /**
   * Numeric identifier for the pillar page:
   * 0: Anemo, 1: Aurora, 2: Dendro, 3: Elementis,
   * 4: Geo, 5: Malvrec, 6: Pyro, 7: Veneno.
   */
  id?: number;

  /**
   * Direct pillar key; if provided, it overrides `id`.
   */
  pillarKey?: AkaladromPillar;
}

/* ===== Domain unions (keys for i18n lookups) ===== */
export type AkaContinent =
  | "CuernoDeTierra"
  | "AltosBrumales"
  | "TierrasMixtas"
  | "Náeryl"
  | "Dregvor"
  | "TulaVarnem"
  | "DesiertoSilencioso"
  | "GrietaTercerLatido";

export type AkaRace =
  | "Demonios"
  | "Elfos"
  | "Fantasmas"
  | "Bestiales"
  | "Humanos"
  | "Enanos"
  | "Orcos"
  | "NoMuertos";

export type AkaClass =
  | "Guerrero"
  | "Mago"
  | "Artificiero"
  | "Cazador"
  | "Arquero"
  | "Asesino"
  | "Músico"
  | "Curandero"
  | "Brujo";

/* ===== Mappings by pillar (keys, not texts) ===== */
const PILLAR_TO_CONTINENT: Record<AkaladromPillar, AkaContinent> = {
  Anemo: "AltosBrumales",
  Aurora: "Náeryl",
  Dendro: "TierrasMixtas",
  Elementis: "TulaVarnem",
  Geo: "TulaVarnem",
  Malvrec: "Dregvor",
  Pyro: "CuernoDeTierra",
  Veneno: "DesiertoSilencioso",
};

const PILLAR_TO_PEOPLES: Record<AkaladromPillar, AkaRace[]> = {
  Anemo: ["Fantasmas"],
  Aurora: ["Elfos"],
  Dendro: ["Orcos"],
  Elementis: ["Enanos"],
  Geo: ["Demonios", "Orcos"],
  Malvrec: ["Humanos"],
  Pyro: ["Bestiales"],
  Veneno: ["NoMuertos"],
};

const PILLAR_TO_MAIN_RACE: Record<AkaladromPillar, AkaRace> = {
  Anemo: "Fantasmas",
  Aurora: "Elfos",
  Dendro: "Orcos",
  Elementis: "Enanos",
  Geo: "Demonios",
  Malvrec: "Humanos",
  Pyro: "Bestiales",
  Veneno: "NoMuertos",
};

const PILLAR_TO_CLASSES: Record<AkaladromPillar, AkaClass[]> = {
  Anemo: ["Músico", "Cazador"],
  Aurora: ["Mago", "Arquero"],
  Dendro: ["Curandero", "Cazador"],
  Elementis: ["Mago", "Artificiero"],
  Geo: ["Guerrero", "Artificiero"],
  Malvrec: ["Asesino", "Brujo"],
  Pyro: ["Guerrero", "Cazador"],
  Veneno: ["Brujo", "Curandero"],
};

/**
 * **DESCRIPTION:**
 *
 * With this interface we can represent the return of the custom hook
 * `useInfoPilar`. It returns a single object with all keys and visual
 * metadata required by the InfoPilar page. Texts should be resolved
 * with the `useTranslations` hook in the component.
 */
export interface UseInfoPilarReturn {
  /** Canonical numeric id (0..7). */
  id: number;
  /** Canonical pillar key. */
  key: AkaladromPillar;
  /** Visual color from pillar meta. */
  color: string;
  /** Image URL for the pillar. */
  imageSrc: string;

  /** Continent (macro-region) i18n key segment. */
  continentKey: AkaContinent;
  /** Peoples (races) i18n key segments. */
  peoples: AkaRace[];
  /** Main race i18n key segment. */
  mainRace: AkaRace;
  /** Main classes i18n key segments. */
  classes: AkaClass[];
}

/**
 * **DESCRIPTION:**
 *
 * Resolve pillar identity and derived world data (continent, peoples, classes).
 * Returns only **keys** to be translated in the component via `useTranslations`.
 *
 * **RETURNS:**
 * @returns an object with:
 * - identity/visuals: `id`, `key`, `color`, `imageSrc`
 * - world keys: `continentKey`, `peoples[]`, `mainRace`, `classes[]`
 *
 * **EXAMPLE OF USE:**
 * @example
 * const info = useInfoPilar({ id: 4 }); // Geo
 * // in component: const name = t(`pillars.${info.key}.label`);
 */
export const useInfoPilar = ({
  id,
  pillarKey,
}: UseInfoPilarProps): UseInfoPilarReturn => {
  const key: AkaladromPillar = useMemo(() => {
    if (pillarKey) return pillarKey;
    const safe = typeof id === "number" && id >= 0 && id < AK_PILLARS_ORDER.length ? id : 0;
    return AK_PILLARS_ORDER[safe];
  }, [id, pillarKey]);

  const meta = getPillar(key);
  const imageSrc = getPillarImage(key);
  const resolvedId = useMemo(
    () => AK_PILLARS_ORDER.findIndex((k) => k === key),
    [key]
  );

  return {
    id: resolvedId,
    key,
    color: meta.color,
    imageSrc,
    continentKey: PILLAR_TO_CONTINENT[key],
    peoples: PILLAR_TO_PEOPLES[key],
    mainRace: PILLAR_TO_MAIN_RACE[key],
    classes: PILLAR_TO_CLASSES[key],
  };
};
