'use client';

import  { useRef,} from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';


const standardMapConfig = {
  basemap: {
    lightPreset: "night",
    showPedestrianRoads: true,
    showPlaceLabels: true,
    showPointOfInterestLabels: false,
    showRoadLabels: true,
    showTransitLabels: false,
    showAdminBoundaries: false,
    showLandmarkIconLabels: false,
    showIndoorLabels: false,
    theme: "faded",
    }
}

const NOVOKUZNETSK_BOUNDS: [number, number, number, number] = [
  86.8500, 53.6000, 
  87.6500, 53.9000  
];

export default function CityMap() { 
  console.log(process.env.MAP_BOX_KEY)
  const mapRef = useRef(null);


  return (
    <div className="w-full h-full m-auto rounded-2xl overflow-hidden">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 87.1363, 
          latitude: 53.7576,
          zoom: 10,
          pitch: 0, 
        }}
        maxZoom={15}
        minZoom={9}
        maxPitch={85}
        mapStyle="mapbox://styles/mapbox/standard" 
        mapboxAccessToken={process.env.MAP_BOX_KEY}
        maxBounds={NOVOKUZNETSK_BOUNDS}
        config={standardMapConfig}
      >
      </Map>
    </div>
  );
}
