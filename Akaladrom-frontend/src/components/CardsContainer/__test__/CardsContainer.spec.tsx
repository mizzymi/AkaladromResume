import { CardsContainer } from '../CardsContainer';
import { render, screen } from '@testing-library/react';

describe('Test for CardsContainer component', () => {

    test('1.- Renders the <CardsContainer/> component', async () => {
        render(<CardsContainer/>);
        const component = await screen.findByTestId('CardsContainer-Component');
        expect(component).toBeInTheDocument();
    });

});
