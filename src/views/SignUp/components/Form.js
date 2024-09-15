/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// Validation schema for form fields
const validationSchema = yup.object({
    first_name: yup
        .string()
        .trim()
        .min(2, 'Please enter a valid first name')
        .max(50, 'Please enter a valid first name')
        .required('First name is required'),
    last_name: yup
        .string()
        .trim()
        .min(2, 'Please enter a valid last name')
        .max(50, 'Please enter a valid last name')
        .required('Last name is required'),
    username: yup
        .string()
        .trim()
        .matches(/^\S*$/, 'Username should not contain spaces') // No spaces allowed
        .min(2, 'Please enter a valid username')
        .max(50, 'Please enter a valid username')
        .required('Username is required'),
    email: yup
        .string()
        .trim()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .required('Please specify your password')
        .min(8, 'The password should have a minimum length of 8 characters'),
});

const Form = () => {
    // Initial form values
    const initialValues = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
    };

    // Submit handler with axios API call
    const onSubmit = async (values, { resetForm }) => {
        try {
            // Values will be sent as is, with appropriate field names
            const response = await axios.post(process.env.toString() + 'signup/', values); // Change URL to actual API
            console.log('Response:', response.data);

            localStorage.setItem('token', response.data.token)
            // Handle success (e.g., show success message, redirect, etc.)
            resetForm(); // Optionally reset the form after successful submission

            window.location.reload();
        } catch (error) {
            console.error('Error during API call:', error.response ? error.response.data : error.message);
            // Handle error (e.g., show error message to the user)
        }
    };

    // Formik setup
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
                    Signup
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Create an account
                </Typography>
                <Typography color="text.secondary">
                    Fill out the form to get started.
                </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                            Enter your first name
                        </Typography>
                        <TextField
                            label="First name *"
                            variant="outlined"
                            name={'first_name'}
                            fullWidth
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                            helperText={formik.touched.first_name && formik.errors.first_name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                            Enter your last name
                        </Typography>
                        <TextField
                            label="Last name *"
                            variant="outlined"
                            name={'last_name'}
                            fullWidth
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                            helperText={formik.touched.last_name && formik.errors.last_name}
                        />
                    </Grid>
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
                        <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                            Enter your email
                        </Typography>
                        <TextField
                            label="Email *"
                            variant="outlined"
                            name={'email'}
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                            Enter your password
                        </Typography>
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
                                    Already have an account?{' '}
                                    <Link
                                        component={'a'}
                                        color={'primary'}
                                        href={'/signin-simple'}
                                        underline={'none'}
                                    >
                                        Login.
                                    </Link>
                                </Typography>
                            </Box>
                            <Button size={'large'} variant={'contained'} type={'submit'}>
                                Sign up
                            </Button>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Typography
                            variant={'subtitle2'}
                            color={'text.secondary'}
                            align={'center'}
                        >
                            By clicking "Sign up" button you agree with our{' '}
                            <Link
                                component={'a'}
                                color={'primary'}
                                href={'/company-terms'}
                                underline={'none'}
                            >
                                company terms and conditions.
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Form;
