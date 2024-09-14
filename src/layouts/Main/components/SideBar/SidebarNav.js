import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';


const SidebarNav = ({ pages }) => {
    const theme = useTheme();
    const { mode } = theme.palette;

    const {
        landings: landingPages,
        secondary: secondaryPages,
        company: companyPages,
        account: accountPages,
        portfolio: portfolioPages,
        blog: blogPages,
    } = pages;

    return (
        <Box>
            <Box width={1} paddingX={2} paddingY={1}>
                <Box
                    display={'flex'}
                    component="a"
                    href="/"
                    title="theFront"
                    width={{ xs: 100, md: 120 }}
                >
                    <Box
                        component={'img'}
                        src={
                            mode === 'light'
                                ? 'https://elasticbeanstalk-us-west-2-730335402099.s3.us-west-2.amazonaws.com/hice_frontend/EdukonaLog.svg'
                                : 'https://elasticbeanstalk-us-west-2-730335402099.s3.us-west-2.amazonaws.com/hice_frontend/EdukonaLog.svg'
                        }
                        height={1}
                        width={1}
                    />
                </Box>
            </Box>
            <Box paddingX={2} paddingY={2}>
                <Box marginTop={2}>
                    <Button
                        size={'large'}
                        variant="contained"
                        color="primary"
                        fullWidth
                        component="a"
                        target="blank"
                        href="/signup"
                    >
                        Sign Up
                    </Button>
                </Box>
                <Box marginTop={1}>
                    <Button
                        size={'large'}
                        variant="outlined"
                        fullWidth
                        component="a"
                        href="/login"
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

SidebarNav.propTypes = {
    pages: PropTypes.object.isRequired,
};

export default SidebarNav;