import React from 'react';
import { render } from '@testing-library/react-native';
import Greeting from '../components/Greeting';

describe('Greeting', () => {
  it('renders a greeting message based on the name prop', () => {
    const { getByTestId, debug } = render(<Greeting name="Kalle" />);

    debug(); // Opcional: Imprime el árbol renderizado para depuración

    expect(getByTestId('greetingText')).toHaveTextContent('Hello Kalle!');
  });
});