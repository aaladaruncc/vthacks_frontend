import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Container from '../../components/Container';
import TopNav from '../../components/TopNav';

import { TopBar, SideBar, Footer } from './components';

const dummyPages = [
    {
        title: 'Home',
        path: '/',
    },
    {
        title: 'About',
        path: '/about',
    },
    {
        title: 'Services',
        path: '/services',
        subpages: [
            { title: 'Consulting', path: '/services/consulting' },
            { title: 'Development', path: '/services/development' },
        ],
    },
    {
        title: 'Contact',
        path: '/contact',
    },
];

const Main = ({ children, colorInvert = false, bgcolor = 'transparent' }) => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const open = isMd ? false : openSidebar;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 38,
    });

    return (
        <Box>
            <AppBar
                position={'sticky'}
                sx={{
                    top: 0,
                    backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
                }}
                elevation={trigger ? 1 : 0}
            >
                <Container paddingY={1}>
                    <TopBar
                        onSidebarOpen={handleSidebarOpen}
                        pages={dummyPages} // Pass dummy pages here
                        colorInvert={trigger ? false : colorInvert}
                    />
                </Container>
            </AppBar>
            <SideBar
                onClose={handleSidebarClose}
                open={open}
                variant="temporary"
                pages={dummyPages} // Pass dummy pages to the sidebar
            />
            <main>
                {children}
                <Divider />
            </main>
            <Container paddingY={4}>
                <Footer />
            </Container>
        </Box>
    );
};

Main.propTypes = {
    children: PropTypes.node,
    colorInvert: PropTypes.bool,
    bgcolor: PropTypes.string,
};

export default Main;
