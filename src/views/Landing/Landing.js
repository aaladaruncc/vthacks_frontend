import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Main from '../../layouts/Main';
import Container from '../../components/Container';
import Hero from './components/Hero';
import Features from './components/Features';
import Masonry from './components/Masonry';


const Landing = () => {
    const theme = useTheme();
    return (
        <Main>
            <Box
                sx={{
                    backgroundColor: theme.palette.alternate?.main || '#f7faff', // Fallback value
                    backgroundImage: `linear-gradient(120deg, ${theme.palette.background?.paper || '#ffffff'} 0%, ${theme.palette.alternate?.main || '#f7faff'} 100%)`,
                    position: 'relative',
                    marginTop: -13,
                    paddingTop: 13,
                }}
            >
                <Container position={'relative'} zIndex={3}>
                    <Hero />
                </Container>
                <Box
                    component={'svg'}
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 1921 273"
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: 1,
                        height: '35%',
                    }}
                >
                    <polygon
                        fill={theme.palette.background?.paper || '#ffffff'} // Fallback value
                        points="0,273 1921,273 1921,0 "
                    />
                </Box>
            </Box>
            <Box bgcolor={theme.palette.alternate?.main || '#f7faff'} paddingBottom={5}>
                <Container>
                    <Masonry/>
                </Container>
            </Box>
            <Container>
                <Features />
            </Container>
            {/*<Box bgcolor={theme.palette.alternate?.main || '#f7faff'}>*/}
            {/*    <Container>*/}
            {/*        <Advantages />*/}
            {/*    </Container>*/}
            {/*</Box>*/}

        </Main>
    );
};

export default Landing;