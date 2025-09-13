import { Cards } from '../Cards';
import { render, screen } from '@testing-library/react';

describe('Test for Cards component', () => {

    test('1.- Renders the <Cards/> component', async () => {
        render(<Cards/>);
        const component = await screen.findByTestId('Cards-Component');
        expect(component).toBeInTheDocument();
    });

});
