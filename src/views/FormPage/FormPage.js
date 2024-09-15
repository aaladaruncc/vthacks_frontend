import React from 'react';
import Form from './components/Form';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapBox from '../MapPage/components/MapBox';
import Main from '../../layouts/Main'// Ensure you import the correct Form component

const FormPage = () => {
  return (
      <Main>
      <Form />
    </Main>

  );
};

export default FormPage;
