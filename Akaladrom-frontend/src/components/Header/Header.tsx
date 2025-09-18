import { type FC, type ReactNode, type HTMLAttributes } from "react";
import { Title } from "../Title/Title";
import { LangSelectorSmart } from "../LangSelector/LangSelector.smart.tsx";
import "./Header.css";
import { useNavigate } from "react-router-dom";

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * Public API for the `Header` component.
 *
 * - `left` (optional): Slot rendered at the far left (defaults to <Title />).
 * - `right` (optional): Slot rendered at the far right (defaults to <LangSelectorSmart />).
 * - `center` (optional): Optional center slot.
 * - `className` (optional): Extra class names for styling.
 * - `testId` (optional): Testing id.
 *
 * Also inherits standard HTML attributes for the root (id, style, etc.).
 */
interface HeaderProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
  testId?: string;
}

/**
 * **DESCRIPTION:**
 *
 * `Header` composes `Title` and `LangSelectorSmart` into a clean top bar.
 * By default it renders:
 * - Left: `<Title i18nKey="app.title" />`
 * - Right: `<LangSelectorSmart />`
 * You can override any slot via props for full flexibility.
 *
 * **EXAMPLE OF USE:**
 * @example
 * <Header />
 * <Header left={<Title text="Akaladrom" />} right={<CustomUserMenu />} />
 */
export const Header: FC<HeaderProps> = ({
  left,
  center,
  right,
  className,
  testId,
  ...rest
}) => {
  const navigate = useNavigate();
  return (
    <header className={["AppHeader", className].filter(Boolean).join(" ")} data-testid={testId ?? "Header"} {...rest}>
      <div className="AppHeader__left">{center ?? null}</div>
      <a onClick={() => navigate('/')} className="AppHeader__center">{left ?? <Title />}</a>
      <div className="AppHeader__right">{right ?? <LangSelectorSmart />}</div>
    </header>
  );
};
