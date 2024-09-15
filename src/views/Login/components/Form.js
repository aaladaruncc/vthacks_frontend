import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'; // Import axios for making API requests

const validationSchema = yup.object({
    username: yup
        .string()
        .trim()
        .matches(/^\S*$/, 'Username should not contain spaces') // No spaces allowed
        .min(2, 'Please enter a valid username')
        .max(50, 'Please enter a valid username')
        .required('Username is required'),
    password: yup
        .string()
        .required('Please specify your password')
        .min(8, 'The password should have at minimum length of 8'),
});

const Form = () => {
    const initialValues = {
        username: '',
        password: '',
    };

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            // Make API call to login
            const response = await axios.post('http://vthacks.eba-gx8k6bzb.us-west-2.elasticbeanstalk.com/login/', {
                username: values.username,
                password: values.password,
            });

            // If login is successful, store the token in local storage
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);

                // Refresh the page to update the navbar
                window.location.reload();
            } else {
                // Handle login failure (e.g., invalid credentials)
                setErrors({ password: 'Invalid username or password' });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ password: 'An error occurred. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit,
    });

    return (
        <Box>
            <Box marginBottom={4}>
                <Typography
                    sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'medium',
                    }}
                    gutterBottom
                    color={'text.secondary'}
                >
                    Login
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Welcome back
                </Typography>
                <Typography color="text.secondary">
                    Login to manage your account.
                </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                            Enter your username
                        </Typography>
                        <TextField
                            label="Username *"
                            variant="outlined"
                            name={'username'}
                            fullWidth
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            alignItems={{ xs: 'stretched', sm: 'center' }}
                            justifyContent={'space-between'}
                            width={1}
                            marginBottom={2}
                        >
                            <Box marginBottom={{ xs: 1, sm: 0 }}>
                                <Typography variant={'subtitle2'}>
                                    Enter your password
                                </Typography>
                            </Box>
                            <Typography variant={'subtitle2'}>
                                <Link
                                    component={'a'}
                                    color={'primary'}
                                    href={'/password-reset-simple'}
                                    underline={'none'}
                                >
                                    Forgot your password?
                                </Link>
                            </Typography>
                        </Box>
                        <TextField
                            label="Password *"
                            variant="outlined"
                            name={'password'}
                            type={'password'}
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item container xs={12}>
                        <Box
                            display="flex"
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            alignItems={{ xs: 'stretched', sm: 'center' }}
                            justifyContent={'space-between'}
                            width={1}
                            maxWidth={600}
                            margin={'0 auto'}
                        >
                            <Box marginBottom={{ xs: 1, sm: 0 }}>
                                <Typography variant={'subtitle2'}>
                                    Don't have an account yet?{' '}
                                    <Link
                                        component={'a'}
                                        color={'primary'}
                                        href={'/signup-simple'}
                                        underline={'none'}
                                    >
                                        Sign up here.
                                    </Link>
                                </Typography>
                            </Box>
                            <Button
                                size={'large'}
                                variant={'contained'}
                                type={'submit'}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Form;
