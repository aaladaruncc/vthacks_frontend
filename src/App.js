import logo from './logo.svg';
import './App.css';

import FormPage from './views/FormPage';

import React, { useRef, useEffect, useState } from 'react';
import Landing from "./views/Landing/Landing"; // eslint-disable-line import/no-webpack-loader-syntax

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import Page from './components/Page';

function App() {
  return (
    
    <Page>
      <Landing />
    </Page>
    
  );
}

export default App;
