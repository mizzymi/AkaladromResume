import { Title } from '../Title';
import { render, screen } from '@testing-library/react';

describe('Test for Title component', () => {

    test('1.- Renders the <Title/> component', async () => {
        render(<Title/>);
        const component = await screen.findByTestId('Title-Component');
        expect(component).toBeInTheDocument();
    });

});
