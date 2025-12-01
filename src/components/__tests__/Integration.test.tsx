import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MapClient from '../MapClient.client';

// Mock the child components to focus on integration logic or keep them real if we want full integration.
// For "integration" in this context (testing MapClient's state management with its children),
// using real children is better unless they are too complex (like a real Map).
// Since FilterPanel and Header are relatively simple, we'll use the real ones.
// However, MapClient might fetch data or do other side effects.
// Let's check MapClient content again. It seems simple state holder.

describe('MapClient Integration', () => {
    it('renders Header and FilterPanel', () => {
        render(<MapClient />);

        // Check for Header
        expect(screen.getByRole('heading', { level: 1, name: /parks & trails companion/i })).toBeInTheDocument();

        // Check for FilterPanel (initially visible)
        expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('updates filter state when FilterPanel interactions occur', () => {
        render(<MapClient />);

        // Initial state check (implicit, but we can verify default values if visible)
        // For example, distance slider should be at 10.
        expect(screen.getByText('10 km')).toBeInTheDocument();

        // Interact with FilterPanel: Change distance
        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: 5 } });

        // Verify update in UI
        expect(screen.getByText('5 km')).toBeInTheDocument();

        // Interact: Toggle a feature
        const badge = screen.getByText('Gardens');
        fireEvent.click(badge);

        // Verify visual feedback (active state has different class/style, but hard to test styles directly without custom matchers)
        // We can check if the class name changes or if we can query by "selected" state if accessible.
        // In the component, selected items have 'bg-[#0C6A3D]'.
        expect(badge).toHaveClass('bg-[#0C6A3D]');
    });

    it('closes FilterPanel when close button is clicked', () => {
        render(<MapClient />);

        const closeButton = screen.getAllByRole('button')[0]; // Assuming first button is close (X)
        fireEvent.click(closeButton);

        // FilterPanel should be gone
        expect(screen.queryByText('Filters')).not.toBeInTheDocument();
    });
});
