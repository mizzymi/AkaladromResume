import { Header } from '../Header';
import { render, screen } from '@testing-library/react';

describe('Test for Header component', () => {

    test('1.- Renders the <Header/> component', async () => {
        render(<Header/>);
        const component = await screen.findByTestId('Header-Component');
        expect(component).toBeInTheDocument();
    });

});
