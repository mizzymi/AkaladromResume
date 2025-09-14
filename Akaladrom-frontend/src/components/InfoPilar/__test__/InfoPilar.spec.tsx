import { InfoPilar } from '../InfoPilar';
import { render, screen } from '@testing-library/react';

describe('Test for InfoPilar component', () => {

    test('1.- Renders the <InfoPilar/> component', async () => {
        render(<InfoPilar/>);
        const component = await screen.findByTestId('InfoPilar-Component');
        expect(component).toBeInTheDocument();
    });

});
