import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterPanel } from '../FilterPanel.client';
import { mockFilterState } from '../../__mocks__/data';

describe('FilterPanel', () => {
    const mockOnFiltersChange = jest.fn();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly when show is true', () => {
        render(
            <FilterPanel
                show={true}
                filters={mockFilterState}
                onFiltersChange={mockOnFiltersChange}
                onClose={mockOnClose}
            />
        );

        expect(screen.getByText('Filters')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search parks & trails...')).toBeInTheDocument();
    });

    it('does not render when show is false', () => {
        render(
            <FilterPanel
                show={false}
                filters={mockFilterState}
                onFiltersChange={mockOnFiltersChange}
                onClose={mockOnClose}
            />
        );

        expect(screen.queryByText('Filters')).not.toBeInTheDocument();
    });

    it('calls onFiltersChange when search input changes', () => {
        render(
            <FilterPanel
                show={true}
                filters={mockFilterState}
                onFiltersChange={mockOnFiltersChange}
                onClose={mockOnClose}
            />
        );

        const searchInput = screen.getByPlaceholderText('Search parks & trails...');
        fireEvent.change(searchInput, { target: { value: 'High Park' } });

        expect(mockOnFiltersChange).toHaveBeenCalledWith({
            ...mockFilterState,
            searchQuery: 'High Park',
        });
    });

    it('calls onFiltersChange when a park type is toggled', () => {
        render(
            <FilterPanel
                show={true}
                filters={mockFilterState}
                onFiltersChange={mockOnFiltersChange}
                onClose={mockOnClose}
            />
        );

        const checkbox = screen.getByLabelText('Regional Park');
        fireEvent.click(checkbox);

        expect(mockOnFiltersChange).toHaveBeenCalledWith({
            ...mockFilterState,
            selectedTypes: ['Regional Park'],
        });
    });

    it('calls onFiltersChange when a feature is toggled', () => {
        render(
            <FilterPanel
                show={true}
                filters={mockFilterState}
                onFiltersChange={mockOnFiltersChange}
                onClose={mockOnClose}
            />
        );

        const badge = screen.getByText('Gardens');
        fireEvent.click(badge);

        expect(mockOnFiltersChange).toHaveBeenCalledWith({
            ...mockFilterState,
            selectedFeatures: ['Gardens'],
        });
    });

    it('calls onClose when close button is clicked', () => {
        render(
            <FilterPanel
                show={true}
                filters={mockFilterState}
                onFiltersChange={mockOnFiltersChange}
                onClose={mockOnClose}
            />
        );

        // Assuming the close button is the one with the X icon, which might be hard to select by text.
        // We can select by role 'button' and pick the first one or look for specific class/icon if needed.
        // In this case, there are multiple buttons (Clear All Filters might be present).
        // The close button is usually at the top.
        const buttons = screen.getAllByRole('button');
        // The first button in the header is the close button (based on code structure)
        fireEvent.click(buttons[0]);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls clearFilters when "Clear All Filters" is clicked', () => {
        const filtersWithSelection = {
            ...mockFilterState,
            searchQuery: 'Test',
        };

        render(
            <FilterPanel
                show={true}
                filters={filtersWithSelection}
                onFiltersChange={mockOnFiltersChange}
                onClose={mockOnClose}
            />
        );

        const clearButton = screen.getByText('Clear All Filters');
        fireEvent.click(clearButton);

        expect(mockOnFiltersChange).toHaveBeenCalledWith({
            searchQuery: '',
            selectedTypes: [],
            maxDistance: 10,
            selectedFeatures: [],
        });
    });
});
