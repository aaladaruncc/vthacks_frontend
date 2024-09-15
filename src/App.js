import logo from './logo.svg';
import './App.css';

import FormPage from './views/FormPage/FormPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import React, { useRef, useEffect, useState } from 'react';
import Landing from "./views/Landing/Landing"; // eslint-disable-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapPage from './views/MapPage/MapPage';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import Page from './components/Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/map' element={<MapPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
