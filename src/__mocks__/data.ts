import { FilterState, Park } from '../types';

export const mockFilterState: FilterState = {
    searchQuery: '',
    selectedTypes: [],
    maxDistance: 10,
    selectedFeatures: [],
};

export const mockParks: Park[] = [
    {
        id: 1,
        name: 'High Park',
        type: 'Regional Park',
        distance: '2.5 km',
        rating: 4.8,
        address: '1873 Bloor St W',
        features: ['Trails', 'Dog Park', 'Zoo', 'Playground'],
        lat: 43.6465,
        lng: -79.4637,
        description: 'A large park with many amenities.',
        size: '161 hectares',
        hours: '24 hours',
    },
    {
        id: 2,
        name: 'Trinity Bellwoods Park',
        type: 'Community Park',
        distance: '1.2 km',
        rating: 4.5,
        address: '790 Queen St W',
        features: ['Dog Park', 'Tennis Courts', 'Playground'],
        lat: 43.6476,
        lng: -79.4138,
        description: 'Popular park in downtown Toronto.',
        size: '14.6 hectares',
        hours: '6am - 11pm',
    },
];
