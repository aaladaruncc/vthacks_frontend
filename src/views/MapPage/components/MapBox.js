import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2aW5iaGF0dCIsImEiOiJjbTEybjVmZXIxNGViMmpxODZndWNkeWtxIn0.5OsReGRpvjRcni-H2U7YKw';

function MapBox({ points = [{ coordinates: [-78.79068, 35.793662], name: "Dinagat Islands" }] }) {
  const mapContainer = useRef(null); // Ref for the map container
  const map = useRef(null); // Ref for the Mapbox instance

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Container ID
      style: 'mapbox://styles/devinbhatt/cm12uxocy005801pd3c5b2ahd', // Detailed style with 3D terrain and buildings
      center: points[0].coordinates, // Center map on the first point
      zoom: 9, // Adjust zoom for better detail visibility
      pitch: 45, // Tilt the map to view 3D buildings
      bearing: -17.6 // Adjust map orientation
    });

    // Prepare GeoJSON data for multiple points
    const geojsonData = {
      type: 'FeatureCollection',
      features: points.map(point => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: point.coordinates // Dynamic coordinates
        },
        properties: {
          name: point.name // Dynamic name
        }
      }))
    };

    // Add the dynamic layer once the map has fully loaded
    map.current.on('load', () => {
      map.current.addSource('earthquakes', {
        type: 'geojson',
        data: geojsonData
      });

      map.current.addLayer({
        id: 'earthquakes-layer',
        type: 'circle',
        source: 'earthquakes',
        paint: {
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white'
        }
      });
    });

    // Cleanup function to remove map resources
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null; // Ensure we reset the reference
      }
    };
  }, [points]); // Re-run effect when points change

  return (
      <div style={{ display: 'flex', height: '85vh' }}>
        {/* Map takes 3/4 of the width */}
        <div
            ref={mapContainer}
            className="map-container"
            style={{ width: '150%', height: '100%' }}
        />
      </div>
  );
}

export default MapBox;