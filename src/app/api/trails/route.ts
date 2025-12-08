import { NextResponse } from "next/server";

const BASE_URL =
  "https://ws.lioservices.lrc.gov.on.ca/arcgis2/rest/services/LIO_OPEN_DATA/LIO_Open04/MapServer";
const TORONTO_BBOX = "-79.6393,43.5810,-79.1150,43.8555"; // Toronto area

export async function GET() {
  try {
    const [segmentsRes, accessRes] = await Promise.all([
      fetch(
        `${BASE_URL}/19/query?where=1%3D1&geometry=${TORONTO_BBOX}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=4326&f=geojson`,
        { cache: "no-store" }
      ),
      fetch(
        `${BASE_URL}/20/query?where=1%3D1&geometry=${TORONTO_BBOX}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=4326&f=geojson`,
        { cache: "no-store" }
      ),
    ]);

    if (!segmentsRes.ok || !accessRes.ok) {
      throw new Error("Failed to fetch LIO trail data");
    }

    const [segments, accessPoints] = await Promise.all([
      segmentsRes.json(),
      accessRes.json(),
    ]);

    return NextResponse.json({ segments, accessPoints });
  } catch (error) {
    console.error("Trail API Error:", error);
    return NextResponse.json({ error: "Trail data fetch failed" }, { status: 500 });
  }
}
