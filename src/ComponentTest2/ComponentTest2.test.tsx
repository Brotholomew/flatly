import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentTest2 from "./ComponentTest2";

it('mockup test - to be deleted in the future', () => {
    render(<ComponentTest2 />);
    const linkElement = screen.getByText(/test2/i);
    expect(linkElement).toBeInTheDocument();
});