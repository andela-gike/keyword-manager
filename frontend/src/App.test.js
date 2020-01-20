import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import App from './App';

test('renders loading state initially', () => {
  const { getByText } = render(
    <MockedProvider mocks={[]}>
      <App />
      </MockedProvider>);
  const linkElement = getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
