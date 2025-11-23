"use client";

import { useState } from "react";
import { FilterState } from "../types";
import { Header } from "./Header";
import { FilterPanel } from "./FilterPanel";

export default function MapClient() {
  const [showFilters, setShowFilters] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    selectedTypes: [],
    maxDistance: 10,
    selectedFeatures: [],
  });

  return (
    <>
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <FilterPanel
          show={showFilters}
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      </div>
    </>
  );
}
