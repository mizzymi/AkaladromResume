import { useMemo, useState, useCallback } from "react";
import {
  AK_PILLARS,
  AK_PILLARS_META,
  AK_PILLARS_ORDER,
  type AkaladromPillar,
  type Pillar,
  type PillarMeta,
} from "../../domain/pillars";

/**
 * **DESCRIPTION:**
 *
 * Input options for the `useCardsContainer` hook. You can override the canonical
 * pillars list, order, and meta; and you can control which pillars are visible initially.
 */
export interface UseCardsContainerProps {
  /**
   * Custom pillars list. Defaults to the canonical AK_PILLARS.
   */
  pillars?: Pillar[];

  /**
   * Rendering order for pillar sections. Defaults to AK_PILLARS_ORDER.
   */
  order?: AkaladromPillar[];

  /**
   * Visual metadata per pillar. Defaults to AK_PILLARS_META.
   */
  meta?: Record<AkaladromPillar, PillarMeta>;

  /**
   * Which pillars should start visible (filter). Defaults to "all".
   */
  initialVisible?: AkaladromPillar[];
}

/**
 * **DESCRIPTION:**
 *
 * With this interface we can represent the return of the
 * custom hook of the useCardsContainer, that this custom
 * hook will return only one property that an object of this
 * type.
 */
export interface UseCardsContainerReturn {
  /**
   * Canon pillars list used by the UI (possibly overridden).
   */
  pillars: Pillar[];

  /**
   * Canon order used to render sections (possibly overridden).
   */
  order: AkaladromPillar[];

  /**
   * Visual metadata per pillar.
   */
  meta: Record<AkaladromPillar, PillarMeta>;

  /**
   * Map of selected/visible pillars for filtering.
   */
  selectedMap: Record<AkaladromPillar, boolean>;

  /**
   * Current visible pillars after filtering.
   */
  visiblePillars: Pillar[];

  /**
   * Toggle a pillar visibility.
   */
  togglePillar: (key: AkaladromPillar) => void;

  /**
   * Set the exact visible selection.
   */
  setVisiblePillars: (keys: AkaladromPillar[]) => void;

  /**
   * Select all pillars.
   */
  selectAll: () => void;

  /**
   * Clear all pillars.
   */
  clearAll: () => void;
}

/**
 * **DESCRIPTION:**
 *
 * You need to write a description of what the useCardsContainer do on here.
 * Manages pillar data and filtering for the CardsContainer component. It provides
 * pillars, order, meta, and helpers to toggle which pillars are visible.
 *
 * **RETURNS:**
 *
 * @returns returns an object with the properties of:
 * - `pillars`, `order`, `meta`
 * - `selectedMap`, `visiblePillars`
 * - actions: `togglePillar`, `setVisiblePillars`, `selectAll`, `clearAll`
 *
 * **EXAMPLE OF USE:**
 * @example
 * const { order, meta, visiblePillars, togglePillar } = useCardsContainer({});
 */
export const useCardsContainer = ({
  pillars = AK_PILLARS,
  order = AK_PILLARS_ORDER,
  meta = AK_PILLARS_META,
  initialVisible,
}: UseCardsContainerProps): UseCardsContainerReturn => {
  const initial = useMemo<Record<AkaladromPillar, boolean>>(() => {
    const start = new Map<AkaladromPillar, boolean>();
    const setAll = !initialVisible || initialVisible.length === 0;
    for (const k of order) {
      start.set(k, setAll ? true : initialVisible!.includes(k));
    }
    return Object.fromEntries(start) as Record<AkaladromPillar, boolean>;
  }, [order, initialVisible]);

  const [selectedMap, setSelectedMap] = useState<Record<AkaladromPillar, boolean>>(initial);

  const visiblePillars = useMemo(
    () => pillars.filter((p) => selectedMap[p.key]),
    [pillars, selectedMap]
  );

  const togglePillar = useCallback((key: AkaladromPillar) => {
    setSelectedMap((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const setVisiblePillars = useCallback((keys: AkaladromPillar[]) => {
    setSelectedMap((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(prev) as AkaladromPillar[]) next[k] = false;
      for (const k of keys) next[k] = true;
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedMap((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(prev) as AkaladromPillar[]) next[k] = true;
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedMap((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(prev) as AkaladromPillar[]) next[k] = false;
      return next;
    });
  }, []);

  return {
    pillars,
    order,
    meta,
    selectedMap,
    visiblePillars,
    togglePillar,
    setVisiblePillars,
    selectAll,
    clearAll,
  };
};
