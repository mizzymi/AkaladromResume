import { LangSelector } from '../LangSelector';
import { render, screen } from '@testing-library/react';

describe('Test for LangSelector component', () => {

    test('1.- Renders the <LangSelector/> component', async () => {
        render(<LangSelector value={'es'} onChange={function (): void {
            throw new Error('Function not implemented.');
        } }/>);
        const component = await screen.findByTestId('LangSelector-Component');
        expect(component).toBeInTheDocument();
    });

});
