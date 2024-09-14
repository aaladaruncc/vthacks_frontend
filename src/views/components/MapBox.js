import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2aW5iaGF0dCIsImEiOiJjbTEybjVmZXIxNGViMmpxODZndWNkeWtxIn0.5OsReGRpvjRcni-H2U7YKw';

function MapBox() { // Ensure component name starts with uppercase
    const mapContainer = useRef(null); // Ref for the map container
    const map = useRef(null); // Ref for the Mapbox instance
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
  
    useEffect(() => {
      if (map.current) return; // Initialize map only once
  
      map.current = new mapboxgl.Map({
        container: mapContainer.current, // Container ID
        style: 'mapbox://styles/mapbox/streets-v12', // Map style
        center: [lng, lat], // Starting position [lng, lat]
        zoom: zoom // Starting zoom
      });
  
      // Update coordinates on map move
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }, [lng, lat, zoom]); // Dependency array ensures effect runs when these values change
  
    return (
      <div>
        <div ref={mapContainer} className="map-container" style={{ height: '500px', width: '100%' }}> 
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        </div>
      </div>
    );
  }
  
  export default MapBox;
