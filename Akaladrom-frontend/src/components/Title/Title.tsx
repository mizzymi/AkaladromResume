import { type FC, type ElementType, type HTMLAttributes } from 'react';
import { useTranslations } from '../../hooks/useTranslations/useTranslations';
import './Title.css';

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * Public API for the `Title` component.
 *
 * - `as` (optional): HTML tag or React component for the title. Defaults to `'h1'`.
 * - `i18nKey` (optional): Translation key to fetch with `useTranslations`. Defaults to `'app.title'`.
 * - `text` (optional): If provided, it overrides the translated text.
 * - `className` (optional): Extra classes for styling.
 * - `testId` (optional): Testing id.
 *
 * Also inherits standard HTML heading attributes (id, style, etc.).
 */
interface TitleProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  as?: ElementType;
  i18nKey?: string;
  text?: string;
  className?: string;
  testId?: string;
}

/**
 * **DESCRIPTION:**
 *
 * `Title` renders a heading using either a translated string (via `i18nKey`)
 * or a literal `text` if provided. Keeps your header copy centralized in i18n.
 *
 * **EXAMPLE OF USE:**
 * @example
 * <Title /> // uses t('app.title')
 * <Title i18nKey='screens.home' />
 * <Title text='Akaladrom' />
 */
export const Title: FC<TitleProps> = ({
  as: As = 'h1',
  i18nKey = 'app.title',
  text,
  className,
  testId,
  ...rest
}) => {
  const { t } = useTranslations({});
  const content = text ?? t(i18nKey);
  return (
    <As className={['HeaderTitle', className].filter(Boolean).join(' ')} data-testid={testId ?? 'Title'} {...rest}>
      {content}
    </As>
  );
};
