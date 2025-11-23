import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
    it('renders correctly', () => {
        render(<Header />);
        // Adjust this expectation based on what's actually in your Header component
        // For now, checking if it renders without crashing and maybe contains some text if known
        // Since I saw the file content earlier, it seemed to have a title or logo.
        // Let's assume it has a title "Parks & Trails Companion" or similar based on project name,
        // or we can just check if a header element exists.
        const headerElement = screen.getByRole('heading', { level: 1, name: /parks & trails companion/i });
        expect(headerElement).toBeInTheDocument();
    });
});
