import React from 'react';
import Form from './components/Form'; // Ensure you import the correct Form component
import 'mapbox-gl/dist/mapbox-gl.css';
import MapBox from './components/MapBox';


const FormPage = () => {
  return (
    <>
    <Form />
    <MapBox />
    </>

  );
};

export default FormPage;
