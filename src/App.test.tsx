import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it('mockup test - to be deleted in the future', () => {
  render(<App />);
  const linkElement = screen.getByText(/test2/i);
  expect(linkElement).toBeInTheDocument();
});
