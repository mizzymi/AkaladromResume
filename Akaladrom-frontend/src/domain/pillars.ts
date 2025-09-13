/**
 * **DESCRIPTION:**
 *
 * Canon pillars used across Akaladrom. Keep this as the single source of truth
 * for names/order/visual metadata so UI components stay consistent.
 */
export type AkaladromPillar =
  | "Anemo"
  | "Aurora"
  | "Dendro"
  | "Elementis"
  | "Geo"
  | "Malvrec"
  | "Pyro"
  | "Veneno";

/**
 * **DESCRIPTION:**
 *
 * Small alias you can use in UIs when you want to talk generically about a pillar key.
 */
export type PillarKey = AkaladromPillar;

/**
 * **DESCRIPTION:**
 *
 * Visual metadata for each pillar (label/color/emoji).
 * `color` admits 6 or 8 digit hex (e.g. "#RRGGBB" or "#RRGGBBAA").
 */
export interface PillarMeta {
  label: string;
  color: string;
  emoji?: string;
}

/**
 * **DESCRIPTION:**
 *
 * Default order to render pillar sections.
 */
export const AK_PILLARS_ORDER: AkaladromPillar[] = [
  "Anemo",
  "Aurora",
  "Dendro",
  "Elementis",
  "Geo",
  "Malvrec",
  "Pyro",
  "Veneno",
];

/**
 * **DESCRIPTION:**
 *
 * Visual metadata for each pillar (label/color/emoji).
 * Tweak colors/emojis to match your art direction.
 */
export const AK_PILLARS_META: Record<AkaladromPillar, PillarMeta> = {
  Anemo:    { label: "Anemo",     color: "#b2c0bbff", emoji: "🌬️" },
  Aurora:   { label: "Aurora",    color: "#0bf5d6ff", emoji: "🌅"  },
  Dendro:   { label: "Dendro",    color: "#0ec527ff", emoji: "🌿"  },
  Elementis:{ label: "Elementis", color: "#f3a6e9ff", emoji: "✨"  },
  Geo:      { label: "Geo",       color: "#583a25ff", emoji: "🪨"  },
  Malvrec:  { label: "Malvrec",   color: "#9c0000ff", emoji: "🕸️" },
  Pyro:     { label: "Pyro",      color: "#d48318ff", emoji: "🔥"  },
  Veneno:   { label: "Veneno",    color: "#790291ff", emoji: "🐍"  },
};

/**
 * **DESCRIPTION:**
 *
 * Canonical pillar entity (content for cards, tooltips, etc.).
 * `name` mirrors the label; `description` is short-form lore text.
 */
export interface Pillar {
  key: AkaladromPillar;
  name: string;
  description?: string;
  /**
   * Optional overrides for visuals (fallbacks come from AK_PILLARS_META).
   */
  color?: string;
  emoji?: string;
}

/**
 * **DESCRIPTION:**
 *
 * Canonical pillars with short descriptions for UI content.
 * If you change ordering, update AK_PILLARS_ORDER instead.
 */
export const AK_PILLARS: Pillar[] = [
  { key: "Anemo",     name: "Anemo",     description: "Memoria en movimiento, viento, ecos." },
  { key: "Aurora",    name: "Aurora",    description: "Agua y rayo, cambio súbito, tensión y descarga." },
  { key: "Dendro",    name: "Dendro",    description: "Brote, ritmo orgánico, simbiosis." },
  { key: "Elementis", name: "Elementis", description: "Arcanos, reglas y transmutación." },
  { key: "Geo",       name: "Geo",       description: "Piedra viva, estructura, runas y estabilidad." },
  { key: "Malvrec",   name: "Malvrec",   description: "Contradicción, manipulación, ambivalencia humana." },
  { key: "Pyro",      name: "Pyro",      description: "Impulso, forja, furor y chispa de vida." },
  { key: "Veneno",    name: "Veneno",    description: "Permanencia, corrupción lenta, resistencia y cura amarga." },
];

/**
 * **DESCRIPTION:**
 *
 * Fast lookup map from pillar key to full Pillar entity,
 * merged with its visual metadata for convenience.
 */
export const AK_PILLARS_MAP: Record<AkaladromPillar, Pillar & PillarMeta> = AK_PILLARS_ORDER.reduce(
  (acc, key) => {
    const base = AK_PILLARS.find((p) => p.key === key)!;
    const meta = AK_PILLARS_META[key];
    acc[key] = {
      ...base,
      color: base.color ?? meta.color,
      emoji: base.emoji ?? meta.emoji,
      label: meta.label,
    };
    return acc;
  },
  {} as Record<AkaladromPillar, Pillar & PillarMeta>
);

/**
 * **DESCRIPTION:**
 *
 * Get visual metadata for a given pillar key.
 *
 * **RETURNS:**
 * @returns the PillarMeta registered for the key.
 *
 * **EXAMPLE OF USE:**
 * @example
 * const meta = getPillarMeta("Geo"); // { label, color, emoji }
 */
export function getPillarMeta(key: AkaladromPillar): PillarMeta {
  return AK_PILLARS_META[key];
}

/**
 * **DESCRIPTION:**
 *
 * Get the canonical Pillar entity (with merged visual meta) by key.
 *
 * **RETURNS:**
 * @returns the Pillar object enriched with label/color/emoji.
 */
export function getPillar(key: AkaladromPillar): Pillar & PillarMeta {
  return AK_PILLARS_MAP[key];
}

/**
 * **DESCRIPTION:**
 *
 * Verify if a string is a valid AkaladromPillar key (case-sensitive).
 *
 * **RETURNS:**
 * @returns `true` if it matches one of the canonical keys.
 */
export function isAkaladromPillar(value: string): value is AkaladromPillar {
  return (AK_PILLARS_ORDER as string[]).includes(value);
}

/**
 * **DESCRIPTION:**
 *
 * Normalize a free-form string to a valid pillar key (case-insensitive).
 *
 * **RETURNS:**
 * @returns the pillar key if resolvable, otherwise `null`.
 *
 * **EXAMPLE OF USE:**
 * @example
 * const key = normalizePillar("geo"); // "Geo"
 */
export function normalizePillar(value: string): AkaladromPillar | null {
  const found = AK_PILLARS_ORDER.find((k) => k.toLowerCase() === value.toLowerCase());
  return found ?? null;
}

/**
 * **DESCRIPTION:**
 *
 * Return a list of pillars in canonical order, optionally filtered by keys.
 *
 * **RETURNS:**
 * @returns Pillar[] (with merged visual meta) ordered canonically.
 *
 * **EXAMPLE OF USE:**
 * @example
 * const subset = getPillars(["Geo","Pyro"]);
 */
export function getPillars(keys?: AkaladromPillar[]): Array<Pillar & PillarMeta> {
  const set = keys ? new Set<AkaladromPillar>(keys) : null;
  return AK_PILLARS_ORDER
    .filter((k) => (set ? set.has(k) : true))
    .map((k) => AK_PILLARS_MAP[k]);
}
