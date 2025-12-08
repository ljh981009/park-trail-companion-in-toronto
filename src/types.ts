export interface Park {
    id: number;
    name: string;
    type: string;
    distance: string;
    rating: number;
    address: string;
    features: string[];
    lat: number;
    lng: number;
    description: string;
    size: string;
    hours: string;
}

export interface FilterState {
    searchQuery: string;
    selectedTypes: string[];
    maxDistance: number;
    selectedFeatures: string[];
}

export interface ApiRecord {
    _id: number;
    LOCATIONID: string;
    ASSET_ID: number;
    ASSET_NAME: string;
    TYPE: string;
    AMENITIES: string;
    ADDRESS: string;
    PHONE: string;
    URL: string;
    geometry: string;
}
