import { Provider } from 'react-redux';
import { AppStore } from '../../redux/AppStore';
import { type FC } from 'react';
import './App.css';
import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Header } from '../Header/Header';
import { InfoPilar } from '../InfoPilar/InfoPilar';

/**
 * **PROPERTIES OF APP COMPONENT:**
 * 
 * This interface currently have 0 properties but if you add any property 
 * you must document it and type it correctly for the usability of the component.
 * 
 */
interface AppProps {

}

/**
 * **DESCRIPTION:**
 * 
 * With this Component you can render all the app of the Akaladrom
 * frontend services.
 * 
 * **EXAMPLE OF USE:**
 * @example
 * return (
 *   <App/>
 * )
 * 
 * @returns return the initial point of the Akaladrom frontend project.
 */
export const App: FC<AppProps> = ({ }) => {

  return (
    <Provider store={AppStore}>
      <div data-testid='App-Component'>
        <Header />
        <Suspense fallback={<div>Cargando…</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/anemo' element={<InfoPilar id={0} />} />
            <Route path='/aurora' element={<InfoPilar id={1} />} />
            <Route path='/dendro' element={<InfoPilar id={2} />} />
            <Route path='/elementis' element={<InfoPilar id={3} />} />
            <Route path='/geo' element={<InfoPilar id={4} />} />
            <Route path='/malvrec' element={<InfoPilar id={5} />} />
            <Route path='/pyro' element={<InfoPilar id={6} />} />
            <Route path='/veneno' element={<InfoPilar id={7} />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Suspense>
      </div>
    </Provider>
  )
}
