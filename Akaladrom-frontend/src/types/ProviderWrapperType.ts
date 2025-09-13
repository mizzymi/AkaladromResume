/**
 * **DESCRIPTION:**
 * 
 * With this type we cna know what the provider
 * wrapper wants and return, in this case wants a
 * children and returns a react element.
 * 
 * **EXAMPLE OF USE:**
 * 
 * @example
 * <wrapper>
 *  <div> Hello world :) ! div element now is the children of wrapper </div>
 * </wrapper>
 */
export type ProviderWrapperType = ({ children }: {
    children: React.ReactNode;
}) => React.JSX.Element
