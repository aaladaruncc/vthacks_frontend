import React, {useEffect, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapBox from './components/MapBox';
import DashboardMain from '../../layouts/Main/DashboardMain';
import { Grid, Box, Paper } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';
import PropertyList from './components/PropertyList';


const mock = {
    "type": "FeatureCollection",
        "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -78.690525,
                    47.773012
                ]
            },
            "properties": {
                "name": "1521 Graduate Lane, Raleigh, NC 27606",
                "description": "This is a description of the property. It is a beautiful place to live.",
                "price": 1000,
                "score": "99%",
                "image": 'https://via.placeholder.com/300x200'
            },
            "id": 1
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -78.79068,
                    35.793662

                ]
            },
            "properties": {
                "name": "8849 Chapel Hill Road, Cary, NC 27513",
                "description": "This is a description of the property. It is a beautiful place to live.",
                "price": 1000,
                "score": "82%",
                "image": 'https://via.placeholder.com/300x200'
            },
            "id": 2
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -78.628023,
                    35.765064
                ]
            },
            "properties": {
                "name": "604 Bragg Street, Raleigh, NC 27610",
                "description": "This is a description of the property. It is a beautiful place to live.",
                "price": 1000,
                "score": "73%",
                "image": 'https://via.placeholder.com/300x200'
            },
            "id": 3
        }
    ]
}
const Dashboard = ({data}) => {
    const theme = useTheme();
    const [center, setCenter] = useState();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    // const processData = (data) => {
    //     // console.log
    // }


    return (
        <DashboardMain>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                minHeight="90vh" // Full height
                width={1}
                sx={{
                    backgroundColor: theme.palette.background.default,
                    padding: isMd ? '1rem 2rem 2rem' : '0.5rem 1rem 1rem', // Reduced top padding
                }}
            >
                <Grid container spacing={isMd ? 2 : 1} alignItems="stretch">
                    {/* MapBox now takes 65% of the width */}
                    <Grid item xs={12} md={8}>
                        <Paper
                            elevation={3} // Add shadow to give it a clean, elevated look
                            sx={{
                                borderRadius: 2,
                                overflow: 'hidden', // Ensure the map is fully contained
                                padding: 0, // No inner padding
                                height: '85vh', // Ensure it matches the height of the form
                            }}
                        >
                            <MapBox points={data} center={center} setCenter={setCenter}/>
                        </Paper>
                    </Grid>
                    {/* Form now takes 35% of the width */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={3} // Add shadow to match the MapBox container
                            sx={{
                                padding: 3,
                                borderRadius: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: '85vh', // Ensure it matches the height of the map
                            }}
                        >
                            <PropertyList geoJson={data} center={center} setCenter={setCenter}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </DashboardMain>
    );
};

export default Dashboard;
