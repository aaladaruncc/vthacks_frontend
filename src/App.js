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

    useEffect(() => {
        const checkAuthStatus = () => {
            const loggedIn = !!localStorage.getItem('token');
            setIsLoggedIn(loggedIn);
        };

        window.addEventListener('storage', checkAuthStatus);

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, []);

  return (
      <Page>
          <Router>
              <Routes>

                  <Route path='/' element={isLoggedIn ? <Dashboard /> : <Landing/>}/>
                  <Route path='/map' element={isLoggedIn ? <MapPage/> : <Landing/>} />
                  <Route path='/signup' element={isLoggedIn ? <Navigate to="/"/> : <SignUp/>} />
                  <Route path={'/login'} element={isLoggedIn ? <Navigate to="/"/> : <Login/>}/>
                  <Route path='/preferences' element={isLoggedIn ? <FormPage/> : <Navigate to="/"/>} />

 
              </Routes>
          </Router>
      </Page>

    
  );
}

export default App;
