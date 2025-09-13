import { useCallback, useMemo, useState } from "react";

/**
 * **DESCRIPTION:**
 *
 * With this interface we can define the properties that the `useCards`
 * custom hook needs in order to manage a card-like selection state.
 */
export interface UseCardsProps {
  /**
   * Initial selection state for the card. Defaults to `false`.
   */
  initialSelected?: boolean;

  /**
   * Optional callback fired whenever the selection state changes.
   * Receives the next selection state and the original event if available.
   */
  onChange?: (nextSelected: boolean, event?: unknown) => void;

  /**
   * When `true`, UI interactions returned by the hook (like `getButtonProps`)
   * will be no-ops. You can still change the state via `setSelected`.
   */
  disabled?: boolean;
}

/**
 * **DESCRIPTION:**
 *
 * With this interface we can represent the return of the
 * custom hook of the `useCards`. This custom hook returns a single
 * object with convenient state + helpers to manage a card selection UX.
 */
export interface UseCardsReturn {
  /**
   * Current selection state of the card.
   */
  selected: boolean;

  /**
   * Imperatively set the current selection state.
   */
  setSelected: (value: boolean, event?: unknown) => void;

  /**
   * Toggle the current selection state.
   */
  toggle: (event?: unknown) => void;

  /**
   * Set the selection state to `true`.
   */
  select: (event?: unknown) => void;

  /**
   * Set the selection state to `false`.
   */
  unselect: (event?: unknown) => void;

  /**
   * **DESCRIPTION:**
   *
   * Helper that returns minimal accessibility + interaction props
   * to spread on a clickable element that should toggle selection.
   * Includes `role="button"`, `tabIndex=0`, `aria-pressed`, a
   * `data-selected` attribute, and handlers for mouse/keyboard.
   *
   * **RETURNS:**
   * An object with DOM props you can spread directly.
   *
   * **EXAMPLE:**
   * ```tsx
   * <div {...getButtonProps()} />
   * ```
   */
  getButtonProps: () => {
    role: "button";
    tabIndex: 0;
    "aria-pressed": boolean;
    "data-selected": "true" | "false";
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  };
}

/**
 * **DESCRIPTION:**
 *
 * `useCards` manages the selection state of a card-like UI element.
 * It exposes a simple API to read and mutate the `selected` state,
 * plus a helper to bind accessible interaction props to any element.
 *
 * **RETURNS:**
 *
 * @returns returns an object with:
 * - `selected`: current state
 * - `setSelected(next, event?)`: setter
 * - `toggle(event?)`: toggler
 * - `select(event?)`: set true
 * - `unselect(event?)`: set false
 * - `getButtonProps()`: ARIA + handlers for mouse/keyboard
 *
 * **EXAMPLE OF USE:**
 * @example
 * const { selected, getButtonProps } = useCards({ initialSelected: false });
 * <article className={selected ? "card is-selected" : "card"} {...getButtonProps()} />
 */
export const useCards = ({
  initialSelected = false,
  onChange,
  disabled = false,
}: UseCardsProps): UseCardsReturn => {
  const [selectedState, setSelectedState] = useState<boolean>(initialSelected);

  const setSelected = useCallback(
    (next: boolean, event?: unknown) => {
      setSelectedState(next);
      onChange?.(next, event);
    },
    [onChange]
  );

  const toggle = useCallback(
    (event?: unknown) => {
      if (disabled) return;
      setSelectedState((prev) => {
        const next = !prev;
        onChange?.(next, event);
        return next;
      });
    },
    [disabled, onChange]
  );

  const select = useCallback(
    (event?: unknown) => {
      if (disabled || selectedState) return;
      setSelectedState(true);
      onChange?.(true, event);
    },
    [disabled, selectedState, onChange]
  );

  const unselect = useCallback(
    (event?: unknown) => {
      if (disabled || !selectedState) return;
      setSelectedState(false);
      onChange?.(false, event);
    },
    [disabled, selectedState, onChange]
  );

  const getButtonProps: UseCardsReturn["getButtonProps"] = useCallback(() => {
    const onClick: UseCardsReturn["getButtonProps"] extends () => infer R
      ? R extends { onClick: infer H } ? H : never : never = (e) => toggle(e);

    const onKeyDown: UseCardsReturn["getButtonProps"] extends () => infer R
      ? R extends { onKeyDown: infer H } ? H : never : never = (e) => {
        // Space or Enter toggles
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle(e);
        }
      };

    return {
      role: "button",
      tabIndex: 0,
      "aria-pressed": selectedState,
      "data-selected": (selectedState ? "true" : "false") as "true" | "false",
      onClick,
      onKeyDown,
    };
  }, [selectedState, toggle]);

  return useMemo<UseCardsReturn>(
    () => ({
      selected: selectedState,
      setSelected,
      toggle,
      select,
      unselect,
      getButtonProps,
    }),
    [selectedState, setSelected, toggle, select, unselect, getButtonProps]
  );
};
