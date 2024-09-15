import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapBox from './components/MapBox';
import Main from '../../layouts/Main'// Ensure you import the correct Form component

const FormPage = () => {
  return (
      <Main>
      <MapBox 
  points={[
    { coordinates: [125.6, 10.1], name: "Dinagat Islands" },
    { coordinates: [125.60001, 10.1], name: "Another Location" },
    { coordinates: [125.65, 10.1], name: "Yet Another Location" },
    { coordinates: [125.7, 10.1], name: "Yet Another Location" },
   
  ]}
/>


    </Main>

  );
};

export default FormPage;
