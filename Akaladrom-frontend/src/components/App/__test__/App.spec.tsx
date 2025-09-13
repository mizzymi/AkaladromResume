import { App } from '../App';
import { render, screen } from '@testing-library/react';

describe('Test for App component', () => {

    test('1.- Renders the <App/> component', async () => {
        render(<App/>);
        const component = await screen.findByTestId('App-Component');
        expect(component).toBeInTheDocument();
    });

});
