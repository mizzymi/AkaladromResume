import {
  type FC,
  type ReactNode,
  type ElementType,
  type HTMLAttributes,
} from "react";
import { useCards, type UseCardsReturn } from "../../hooks/useCards/useCards";
import "./Cards.css";

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * Public API of the reusable `Cards` component.
 *
 * - `as` (optional): Root element/component. Defaults to `"article"`.
 * - `className` (optional): Extra class names.
 * - `children` (required): Content. Can be a ReactNode or a render function receiving the hook API.
 * - `interactive` (optional): If `true`, root gets ARIA+handlers from `useCards`. Defaults to `true`.
 * - `initialSelected` (optional): Initial selection state. Defaults to `false`.
 * - `onSelectedChange` (optional): Callback when selection changes.
 * - `disabled` (optional): Disable interactions; still allows imperative changes via API.
 * - `testId` (optional): Sets `data-testid` on root.
 *
 * Also inherits standard HTML attributes for the root element (click, style, id, etc.),
 * except the native `onChange`, which is omitted to avoid type conflicts.
 */
interface CardsProps
  extends Omit<HTMLAttributes<HTMLElement>, "children" | "onChange"> {
  as?: ElementType;
  className?: string;
  children: ReactNode | ((api: UseCardsReturn) => ReactNode);
  interactive?: boolean;
  initialSelected?: boolean;
  onSelectedChange?: (nextSelected: boolean, event?: unknown) => void;
  disabled?: boolean;
  testId?: string;

  /**
   * If you still need to forward a native onChange to the root element,
   * use this prop instead. It will be attached after the hook's handlers.
   */
  nativeOnChange?: HTMLAttributes<HTMLElement>["onChange"];
}

/**
 * **DESCRIPTION:**
 *
 * `Cards` is a minimal, fully reusable container for “card-like” UIs.
 * It delegates selection state and accessibility helpers to `useCards`
 * and renders whatever you pass as `children`. If `children` is a
 * function, it receives the hook API (`UseCardsReturn`) so you can
 * read `selected` and call actions (`toggle`, `select`, `unselect`)
 * or attach `getButtonProps()` where you want.
 *
 * **EXAMPLE OF USE:**
 * @example
 * // Plain children
 * <Cards>
 *   <div className="card__content">
 *     <h3 className="card__title">Plain Card</h3>
 *     <p className="card__subtitle">Static content</p>
 *   </div>
 * </Cards>
 *
 * // Render-prop children
 * <Cards initialSelected onSelectedChange={(n) => console.log('changed:', n)}>
 *   {({ selected, toggle }) => (
 *     <>
 *       <header className="card__content">
 *         <h3 className="card__title">Render Prop</h3>
 *         <p className="card__subtitle">{selected ? 'Selected' : 'Not selected'}</p>
 *       </header>
 *       <footer className="card__footer">
 *         <button className="card__btn" onClick={toggle}>Toggle</button>
 *       </footer>
 *     </>
 *   )}
 * </Cards>
 */
export const Cards: FC<CardsProps> = ({
  as: As = "article",
  className,
  children,
  interactive = true,
  initialSelected = false,
  onSelectedChange,
  disabled = false,
  testId,
  nativeOnChange,
  onClick,
  onKeyDown,

  ...rest
}) => {
  const api = useCards({
    initialSelected,
    onChange: onSelectedChange,
    disabled,
  });

  const rootClass = ["card", api.selected ? "is-selected" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  const hookProps = interactive ? api.getButtonProps() : undefined;

  const handleClick: NonNullable<HTMLAttributes<HTMLElement>["onClick"]> = (e) => {
    if (interactive) hookProps?.onClick?.(e);
    onClick?.(e);
  };

  const handleKeyDown: NonNullable<HTMLAttributes<HTMLElement>["onKeyDown"]> = (e) => {
    if (interactive) hookProps?.onKeyDown?.(e);
    onKeyDown?.(e);
  };

  return (
    <As
      className={rootClass}
      data-testid={testId ?? "Cards-Component"}
      {...(interactive ? hookProps : {})}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onChange={nativeOnChange}
      {...rest}
    >
      {typeof children === "function"
        ? (children as (a: UseCardsReturn) => ReactNode)(api)
        : children}
    </As>
  );
};
