import React from 'react';
import { render, screen } from '@testing-library/react';
import Test1 from "./test1";

it('renders without crashing', () => {
    render(<Test1 />);
    const linkElement = screen.getByText(/test1/i);
    expect(linkElement).toBeInTheDocument();
});