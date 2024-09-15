import logo from './logo.svg';
import './App.css';

import FormPage from './views/FormPage/FormPage';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import React, { useRef, useEffect, useState } from 'react';
import Landing from "./views/Landing/Landing"; // eslint-disable-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapPage from './views/MapPage/MapPage';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import Page from './components/Page';
import SignUp from "./views/SignUp/SignUp";
import Dashboard from "./views/Dashboard/Dashboard";
import Login from "./views/Login/Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [hasPref, setPref] = useState(!!localStorage.getItem('token'));


  return (
      <Page>
          <Router>
              <Routes>

                  <Route path='/' element={<Landing/>}/>
                  {/* <Route path='/map' element={isLoggedIn ? <MapPage/> : <Landing/>} />
                  <Route path='/signup' element={isLoggedIn ? <Navigate to="/"/> : <SignUp/>} />
                  <Route path={'/login'} element={isLoggedIn ? <Navigate to="/"/> : <Login/>}/> */}
                  <Route path='/preferences' element={<FormPage/>} />
                  <Route path='/dashboard' element={<Dashboard/>}/>

 
              </Routes>
          </Router>
      </Page>

    
  );
}

export default App;
