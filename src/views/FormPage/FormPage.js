import axios from 'axios';
import { Box, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Form from './components/Form'; // Adjust the path as needed
import FormText from './components/FormText'; // Adjust the path as needed
import LottieAnimation from './components/LottieAnimation'; // Adjust the path as needed
import Main from '../../layouts/Main'; // Ensure you import the correct Main component
import Dashboard from '../Dashboard/Dashboard';

const FormPage = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);




  

  if(data){
    <Dashboard data={data}/>
  }else{
    return (

      <Main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          width={1}
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: isMd ? 2 : 1, // Adjust padding based on screen size
          }}
        >
          <Box
            elevation={3}
            sx={{
              width: '100%',
              maxWidth: isMd ? '1500px' : '100%', // Constrain width for larger screens
              borderRadius: 2,
              overflow: 'hidden',
              padding: 0,
              display: 'flex',
            }}
          >
            <Grid container spacing={isMd ? 2 : 1} alignItems="stretch">
              {/* Form now takes 65% of the width */}
              <Grid item xs={12} md={8}>
                <Form data={data} setData={setData} />
              </Grid>

              {/* FormText and Animation now take 35% of the width */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    padding: 2,
                    paddingBottom: 0 // Add padding if needed
                  }}
                >
                  <FormText />
                  <LottieAnimation /> {/* Add the Lottie animation here */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Main>
    );
  }

    
};

export default FormPage;
