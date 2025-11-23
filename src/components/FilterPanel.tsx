"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { parkTypes, parkFeatures } from "../constants";
import type { FilterState } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface FilterPanelProps {
  show: boolean;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClose: () => void;
}

export function FilterPanel({
  show,
  filters,
  onFiltersChange,
  onClose,
}: FilterPanelProps) {
  const toggleType = (type: string) => {
    const newTypes = filters.selectedTypes.includes(type)
      ? filters.selectedTypes.filter((t) => t !== type)
      : [...filters.selectedTypes, type];
    onFiltersChange({ ...filters, selectedTypes: newTypes });
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.selectedFeatures.includes(feature)
      ? filters.selectedFeatures.filter((f) => f !== feature)
      : [...filters.selectedFeatures, feature];
    onFiltersChange({ ...filters, selectedFeatures: newFeatures });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchQuery: "",
      selectedTypes: [],
      maxDistance: 10,
      selectedFeatures: [],
    });
  };

  if (!show) return null;

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#0C6A3D]" />
            <h2 className="text-[#0C6A3D] font-medium">Filters</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div>
          <label className="text-sm text-gray-700 mb-2 block">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search parks & trails..."
              value={filters.searchQuery}
              onChange={(e) =>
                onFiltersChange({ ...filters, searchQuery: e.target.value })
              }
              className="pl-10"
            />
          </div>
        </div>

        {/* Park Types */}
        <div>
          <h3 className="mb-3 text-gray-700">Park Type</h3>
          <div className="space-y-2 grid grid-cols-2">
            {parkTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0C6A3D] focus:ring-[#0C6A3D]"
                />
                <span className="text-sm group-hover:text-[#0C6A3D] transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-gray-700">Distance</h3>
            <span className="text-sm text-[#0C6A3D]">
              {filters.maxDistance} km
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            value={filters.maxDistance}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                maxDistance: Number(e.target.value),
              })
            }
            className="w-full accent-[#0C6A3D]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 km</span>
            <span>15 km</span>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="mb-3 text-gray-700">Features</h3>
          <div className="w-full gap-2 flex flex-wrap">
            {parkFeatures.map((feature) => (
              <Badge
                key={feature}
                variant={
                  filters.selectedFeatures.includes(feature)
                    ? "default"
                    : "outline"
                }
                className={`cursor-pointer w-fit transition-colors ${filters.selectedFeatures.includes(feature)
                  ? "bg-[#0C6A3D] text-white hover:bg-[#0C6A3D]/90"
                  : "hover:bg-[#E9F5EC] hover:border-[#0C6A3D]"
                  }`}
                onClick={() => toggleFeature(feature)}
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(filters.searchQuery ||
          filters.selectedTypes.length > 0 ||
          filters.selectedFeatures.length > 0 ||
          filters.maxDistance < 10) && (
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear All Filters
            </Button>
          )}
      </div>
    </div>
  );
}
