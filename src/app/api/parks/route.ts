import { NextResponse } from 'next/server';
import type { ApiRecord, Park } from '@/types';

const PACKAGE_ID = 'cbea3a67-9168-4c6d-8186-16ac1a795b5b'; // Toronto Open Data: Parks dataset
const BASE_URL = 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action';

/**
 * Transform raw API record to Park interface
 */
function transformToPark(record: ApiRecord): Park | null {
  try {
    // Parse geometry to extract lat/lng
    const geometry = JSON.parse(record.geometry);
    const coordinates = geometry.coordinates;
    
    // Handle both Point [lng, lat] and potential other geometry types
    let lng: number, lat: number;
    if (geometry.type === 'Point') {
      [lng, lat] = coordinates;
    } else {
      // Skip non-Point geometries for now
      return null;
    }

    return {
      id: record.ASSET_ID,
      name: record.ASSET_NAME || 'Unknown Park',
      type: record.TYPE || 'Park',
      distance: '0 km', // Calculate this on the client side based on user location
      rating: 4.0, // Default rating, can be enhanced later
      address: record.ADDRESS || 'Address not available',
      features: record.AMENITIES ? record.AMENITIES.split(',').map(f => f.trim()) : [],
      lat,
      lng,
      description: `${record.ASSET_NAME} is a ${record.TYPE || 'park'} in Toronto.`,
      size: 'Medium', // Can be enhanced with actual size data if available
      hours: 'Dawn to Dusk', // Default hours
    };
  } catch (error) {
    console.error('Error transforming record:', record, error);
    return null;
  }
}

/**
 * GET /api/parks
 * Proxy route for Toronto Open Data (Parks dataset)
 */

export async function GET() {
  try {
    // 1️⃣ fetch package metadata
    const packageRes = await fetch(`${BASE_URL}/package_show?id=${PACKAGE_ID}`, {
      cache: 'no-store', // always fetch the latest data
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!packageRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch package info' },
        { status: packageRes.status }
      );
    }

    const packageData = await packageRes.json();

    // 2️⃣ find the resource with datastore_active=true
    const resource = packageData.result.resources.find((r: any) => r.datastore_active);

    if (!resource) {
      return NextResponse.json(
        { error: 'No active datastore resource found' },
        { status: 404 }
      );
    }

    // 3️⃣ fetch records
    const recordsRes = await fetch(
      `${BASE_URL}/datastore_search?id=${resource.id}&limit=100`,
      { cache: 'no-store' }
    );

    if (!recordsRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch records' },
        { status: recordsRes.status }
      );
    }

    const recordsData = await recordsRes.json();

    // 4️⃣ transform and return records
    const parks: Park[] = recordsData.result.records
      .map((record: ApiRecord) => transformToPark(record))
      .filter((park: Park | null): park is Park => park !== null);

    return NextResponse.json(parks);
  } catch (error) {
    console.error('API Proxy Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
