import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cabecalho from "./cabecalho";

describe('<Cabecalho />', () => {
  test('it should mount', () => {
    render(<Cabecalho />);
    
    const cabecalho = screen.getByTestId('Cabecalho');

    expect(cabecalho).toBeInTheDocument();
  });
});