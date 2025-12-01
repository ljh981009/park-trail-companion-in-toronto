// src/lib/api.ts
import type { Park } from '@/types';

export async function fetchParks(): Promise<Park[]> {
  const res = await fetch('/api/parks', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch parks');
  return res.json();
}
