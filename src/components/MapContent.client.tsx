'use client';

import dynamic from 'next/dynamic';
import { useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';
import type { Park } from '@/types';
import { fetchParks } from '@/lib/api';

// ✅ Lazy-load leaflet (Next.js에서 SSR 방지)
const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false });

// ✅ Leaflet Marker 아이콘
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
const defaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

function MapController({ selectedPark }: { selectedPark: Park | null }) {
  const map = useMap();
  if (selectedPark && map) {
    map.setView([selectedPark.lat, selectedPark.lng], 14, { animate: true });
  }
  return null;
}

interface ParkMarkersProps {
  parks: Park[];
  onParkClick: (park: Park) => void;
}

function ParkMarkers({ parks, onParkClick }: ParkMarkersProps) {
  return (
    <>
      {parks.map((park) => (
        <Marker
          key={park.id}
          position={[park.lat, park.lng]}
          eventHandlers={{ click: () => onParkClick(park) }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{park.name}</h3>
              <p className="text-sm">{park.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

interface MapContentProps {
  selectedPark: Park | null;
  onSelectPark: (park: Park) => void;
}

export default function MapContent({ selectedPark, onSelectPark }: MapContentProps) {
  const { data: parks, isLoading, isError } = useQuery({
    queryKey: ['parks'],
    queryFn: fetchParks,
    staleTime: 1000 * 60 * 10, // 10분 캐싱
  });

  const center: [number, number] = [43.6532, -79.3832];

  const handleParkClick = useCallback((park: Park) => {
    onSelectPark(park);
  }, [onSelectPark]);

  const mapDisplay = useMemo(() => {
    if (!parks) return null;
    return (
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController selectedPark={selectedPark} />
        <ParkMarkers parks={parks} onParkClick={handleParkClick} />
      </MapContainer>
    );
  }, [parks, selectedPark, handleParkClick]);

  if (isLoading)
    return <div className="flex items-center justify-center h-full">Loading parks...</div>;
  if (isError)
    return <div className="flex items-center justify-center h-full text-red-600">Failed to load data</div>;

  return mapDisplay;
}
