"use client";

import { useState } from "react";
import { FilterState } from "../types";
import { Header } from "./Header";
import { FilterPanel } from "./FilterPanel.client";
import dynamic from "next/dynamic";

const MapContent = dynamic(() => import("./MapContent.client"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />,
});

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
      <div className="flex-1 flex overflow-hidden relative">
        <FilterPanel
          show={showFilters}
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
        <div className="flex-1 relative h-full">
          <MapContent />
        </div>
      </div>
    </>
  );
}
