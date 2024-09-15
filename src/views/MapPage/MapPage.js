import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapBox from './components/MapBox';
import Main from '../../layouts/Main'// Ensure you import the correct Form component
import Form from './components/Form';
import { Grid, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';

const FormPage = () => {
    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

  return (
    <Main>
        <Box>
            <Grid container spacing={4}>
            <Grid item container alignItems={'center'} xs={12} md={6}>
                <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
                    <MapBox />
                </Box>
            </Grid>
            <Grid item container alignItems={'center'} xs={12} md={6}>
                <Form />
            </Grid>
            </Grid>
        </Box>
        
    </Main>

  );
};

export default FormPage;
