"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapContent() {
  // 두 가지 데이터를 병렬 요청
  const { data, isLoading, error } = useQuery({
    queryKey: ["trailData"],
    queryFn: async () => {
      const [segmentsRes, accessRes] = await Promise.all([
        fetch(
          "https://ws.lioservices.lrc.gov.on.ca/arcgis2/rest/services/LIO_OPEN_DATA/LIO_Open04/MapServer/19/query?where=OBJECTID>0&outFields=*&outSR=4326&f=geojson"
        ),
        fetch(
          "https://ws.lioservices.lrc.gov.on.ca/arcgis2/rest/services/LIO_OPEN_DATA/LIO_Open04/MapServer/20/query?where=OBJECTID>0&outFields=*&outSR=4326&f=geojson"
        ),
      ]);

      if (!segmentsRes.ok || !accessRes.ok) {
        throw new Error("Failed to fetch trail data");
      }

      const [segments, accessPoints] = await Promise.all([
        segmentsRes.json(),
        accessRes.json(),
      ]);

      return { segments, accessPoints };
    },
  });

  if (isLoading) return <p>Loading trails...</p>;
  if (error) return <p>Failed to load trail data</p>;

  // 스타일 정의
  const segmentStyle: L.PathOptions = {
    color: "#2E7D32", // 초록색
    weight: 2,
    opacity: 0.8,
  };

  // 트레일 선 팝업
  const onEachSegment = (feature: any, layer: L.Layer) => {
    const props = feature.properties;
    if (props?.TRAIL_NAME) {
      layer.bindPopup(
        `<b>${props.TRAIL_NAME}</b><br/>
         ${props.DESCRIPTION ?? ""}<br/>
         <i>${props.TRAIL_ASSOCIATION ?? ""}</i>`
      );
    }
  };

  // 접근 포인트 마커
  const accessPointToLayer = (feature: any, latlng: L.LatLng) => {
    return L.circleMarker(latlng, {
      radius: 4,
      fillColor: "#1976D2", // 파란색
      color: "#fff",
      weight: 1,
      fillOpacity: 0.9,
    });
  };

  const onEachAccessPoint = (feature: any, layer: L.Layer) => {
    const props = feature.properties;
    layer.bindPopup(
      `<b>Access Point</b><br/>
       Accuracy: ${props.LOCATION_ACCURACY ?? "N/A"}<br/>
       ID: ${props.OBJECTID}`
    );
  };

  console.log("data", data)

  return (
    <MapContainer
      center={[43.7, -79.4]} // Toronto 중심
      zoom={11}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 트레일 라인 */}
      {data?.segments && (
        <GeoJSON
          data={data.segments}
          style={segmentStyle}
          onEachFeature={onEachSegment}
        />
      )}

      {/* 접근 포인트 */}
      {data?.accessPoints && (
        <GeoJSON
          data={data.accessPoints}
          pointToLayer={accessPointToLayer}
          onEachFeature={onEachAccessPoint}
        />
      )}
    </MapContainer>
  );
}
