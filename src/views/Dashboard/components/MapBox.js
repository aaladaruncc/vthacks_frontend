import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2aW5iaGF0dCIsImEiOiJjbTEybjVmZXIxNGViMmpxODZndWNkeWtxIn0.5OsReGRpvjRcni-H2U7YKw';

function MapBox({ points, center }) {
    const mapContainer = useRef(null); // Ref for the map container
    const map = useRef(null); // Ref for the Mapbox instance

    useEffect(() => {
        if (map.current) return; // Initialize map only once

        // Initialize the map with the center of the US as the default starting point
        map.current = new mapboxgl.Map({
            container: mapContainer.current, // Container ID
            style: 'mapbox://styles/devinbhatt/cm12uxocy005801pd3c5b2ahd', // Map style
            center: [-98.5795, 39.8283], // Default to the center of the US
            zoom: 4, // Adjust zoom to cover the US
            pitch: 45, // Tilt the map for a 3D effect
            bearing: -17.6 // Adjust map orientation
        });

        // Add the dynamic layer once the map has fully loaded
        map.current.on('load', () => {
            // Add source for points from geoJson data
            map.current.addSource('properties', {
                type: 'geojson',
                data: points
            });

            map.current.addLayer({
                id: 'properties-layer',
                type: 'circle',
                source: 'properties',
                paint: {
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-color': 'red',
                    'circle-stroke-color': 'white'
                }
            });

            // Add popup functionality for each point
            map.current.on('click', 'properties-layer', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const { name, description, price, score, image } = e.features[0].properties;

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`
                        <h3>${name}</h3>
                        <p>${description}</p>
                        <p><strong>Price:</strong> $${price}</p>
                        <p><strong>Score:</strong> ${score}</p>
                        <img src="${image}" alt="${name}" width="100%">
                    `)
                    .addTo(map.current);
            });

            // Change the cursor to pointer when hovering over a point
            map.current.on('mouseenter', 'properties-layer', () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });

            // Reset the cursor when it leaves the point
            map.current.on('mouseleave', 'properties-layer', () => {
                map.current.getCanvas().style.cursor = '';
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

    // Effect to center the map based on the changing center ID
    useEffect(() => {
        if (!map.current || !center) return;

        // Find the feature that matches the center ID
        const feature = points.features.find(f => f.id === center);

        if (feature) {
            // Use mapbox's flyTo method to center the map on the selected feature's coordinates
            map.current.flyTo({
                center: feature.geometry.coordinates,
                essential: true, // This ensures the animation works even if the user has reduced motion settings
                zoom: 12 // Adjust zoom level when centering on a point
            });
        }
    }, [center, points]);

    return (
        <div style={{ display: 'flex', height: '85vh' }}>
            {/* Map takes full height and width */}
            <div
                ref={mapContainer}
                className="map-container"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

export default MapBox;
