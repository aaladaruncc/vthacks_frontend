import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import ThemeModeToggler from "../../../../components/ThemeModeToggler";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from './locus.png'; 

const TopBar = ({ onSidebarOpen, pages, colorInvert = false }) => {
    const theme = useTheme();
    const { mode } = theme.palette;
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });
    const {
        landings: landingPages,
        secondary: secondaryPages,
        company: companyPages,
        account: accountPages,
        portfolio: portfolioPages,
        blog: blogPages,
    } = pages;

    // State to track whether a token exists
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check local storage for token when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={1}
        >
            <Box
                display={'flex'}
                component="a"
                href="/"
                title="Edukona"
                width={{ xs: 120, md: 140 }}
                height={{ xs: 50, md: 60 }}
                sx={{
                    overflow: 'hidden',
                }}
            >
                <Box
                    component={'img'}
                    src={logo}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />

            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>

                <Box
                    component={Button}
                    variant="outlined"
                    color="primary"
                    size="large"
                    marginTop={{ xs: 2, sm: 0 }}
                    marginLeft={{ sm: 2 }}
                    href="/preferences"
                    fullWidth={isMd ? false : true}
                >
                    Try it out!
                </Box>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
                <Button
                    onClick={() => onSidebarOpen()}
                    aria-label="Menu"
                    variant={'outlined'}
                    sx={{
                        borderRadius: 2,
                        minWidth: 'auto',
                        padding: 1,
                        borderColor: alpha(theme.palette.divider, 0.2),
                    }}
                >
                    <MenuIcon />
                </Button>
            </Box>
        </Box>
    );
};

TopBar.propTypes = {
    onSidebarOpen: PropTypes.func,
    pages: PropTypes.object,
    colorInvert: PropTypes.bool,
};

export default TopBar;
