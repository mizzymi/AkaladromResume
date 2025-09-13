import type { AkaladromPillar } from "../../domain/pillars";

export const PILLAR_IMAGE_SRC: Record<AkaladromPillar, string> = {
  Anemo:     new URL("./anemo.png", import.meta.url).href,
  Aurora:    new URL("./aurora.png", import.meta.url).href,
  Dendro:    new URL("./dendro.png", import.meta.url).href,
  Elementis: new URL("./elementis.png", import.meta.url).href,
  Geo:       new URL("./geo.png", import.meta.url).href,
  Malvrec:   new URL("./malvrec.png", import.meta.url).href,
  Pyro:      new URL("./pyro.png", import.meta.url).href,
  Veneno:    new URL("./veneno.png", import.meta.url).href,
};

export function getPillarImage(key: AkaladromPillar): string {
  return PILLAR_IMAGE_SRC[key];
}
