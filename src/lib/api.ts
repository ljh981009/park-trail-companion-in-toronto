// src/lib/api.ts
import type { Park } from '@/types';

export async function fetchParks(): Promise<Park[]> {
  const res = await fetch('/api/parks', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch parks');
  return res.json();
}

export async function fetchTrails(): Promise<any> {
  const res = await fetch("/api/trails", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch trails");
  return res.json();
}
