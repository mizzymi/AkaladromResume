import { type FC } from 'react';
import './Home.css';
import { CardsContainer } from '../CardsContainer/CardsContainer';

/**
 * **PROPERTIES OF APP COMPONENT:**
 * 
 * This interface currently have 0 properties but if you add any property 
 * you must document it and type it correctly for the usability of the component.
 * 
 */
interface HomeProps {

}

/**
 * **DESCRIPTION:**
 * 
 * With this component you can render the home page
 * 
 * **EXAMPLE OF USE:**
 * @example
 * return (
 *   <Home/>
 * )
 */
export const Home: FC<HomeProps> = ({ }) => {

  return (
    <div data-testid='Home-Component'>
      <CardsContainer/>
    </div>
  )
}
