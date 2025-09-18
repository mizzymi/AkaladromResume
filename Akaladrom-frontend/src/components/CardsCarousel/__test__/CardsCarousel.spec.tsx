import { CardsCarousel } from '../CardsCarousel';
import { render, screen } from '@testing-library/react';

describe('Test for CardsCarousel component', () => {

    test('1.- Renders the <CardsCarousel/> component', async () => {
        render(<CardsCarousel/>);
        const component = await screen.findByTestId('CardsCarousel-Component');
        expect(component).toBeInTheDocument();
    });

});
