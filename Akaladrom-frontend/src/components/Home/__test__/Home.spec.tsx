import { Home } from '../Home';
import { render, screen } from '@testing-library/react';

describe('Test for Home component', () => {

    test('1.- Renders the <Home/> component', async () => {
        render(<Home/>);
        const component = await screen.findByTestId('Home-Component');
        expect(component).toBeInTheDocument();
    });

});
