import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapBox from './components/MapBox';
import Main from '../../layouts/Main';
import Form from './components/Form';
import { Grid, Box, Paper } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';

const FormPage = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <Main>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                minHeight="100vh" // Full height
                width={1}
                sx={{
                    backgroundColor: theme.palette.background.default,
                    padding: isMd ? 4 : 2,
                }}
            >
                <Grid container spacing={isMd ? 4 : 2} alignItems="stretch">
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={3} // Add shadow to give it a clean, elevated look
                            sx={{
                                height: '100%',
                                borderRadius: 2,
                                overflow: 'hidden', // Ensure the map is fully contained
                            }}
                        >
                            <MapBox />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={3} // Shadow to match the MapBox container
                            sx={{
                                padding: 3,
                                borderRadius: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <Form />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Main>
    );
};

export default FormPage;
