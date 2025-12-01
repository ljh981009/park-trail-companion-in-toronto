import { NextResponse } from 'next/server';

const PACKAGE_ID = 'cbea3a67-9168-4c6d-8186-16ac1a795b5b'; // Toronto Open Data: Parks dataset
const BASE_URL = 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action';

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

    // 4️⃣ return records
    return NextResponse.json(recordsData.result.records);
  } catch (error) {
    console.error('API Proxy Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
