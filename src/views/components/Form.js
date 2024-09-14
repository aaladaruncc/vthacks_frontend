import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Slider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Paper, Grid } from '@mui/material';

const Form = () => {
  const [formData, setFormData] = useState({
    zipCode: '',              // Zip code field
    restaurantProximity: 1,    // Proximity value for restaurants
    restaurantPrice: 1,        // Price value for restaurants
    groceryProximity: 1,       // Proximity value for groceries
    groceryPrice: 1,           // Price value for groceries
    gymProximity: 1,           // Proximity value for gym
    gymPrice: 1,               // Price value for gym
    serviceImportance: 1,      // Importance of service
    hasCar: '',                // Whether the user has a car
    needsParking: ''           // Whether the user needs parking
  });

  // Function to handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle slider changes
  const handleSliderChange = (name) => (e, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  // Function to submit the form data and post to /userdata endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Converting formData to JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const sliderMarks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' }
  ];

  return (
    <Container maxWidth="md" sx={{ pt: 3, pb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
          Preferences Form
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',  // Increase gap between items for better spacing
          }}
        >
          {/* Zip Code Input */}
          <TextField
            label="Zip Code"
            name="zipCode"
            variant="outlined"
            value={formData.zipCode}
            onChange={handleChange}
            fullWidth
            required
          />

          {/* Has Car and Needs Parking */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Do you have a car?</FormLabel>
                <RadioGroup
                  row
                  name="hasCar"
                  value={formData.hasCar}
                  onChange={handleChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Do you need parking?</FormLabel>
                <RadioGroup
                  row
                  name="needsParking"
                  value={formData.needsParking}
                  onChange={handleChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          {/* Preferences Sections */}
          <Box sx={{ mb: -1 }}>
            <Typography variant="h6">Restaurants</Typography>
            <Typography variant="subtitle1">How important is this to you?</Typography>
            <Slider
              name="restaurantProximity"
              value={formData.restaurantProximity}
              onChange={handleSliderChange('restaurantProximity')}
              step={1}
              marks={sliderMarks}
              min={1}
              max={5}
              valueLabelDisplay="auto"
            />
            <Typography variant="subtitle1" sx={{ mt: 1 }}>How big is your budget?</Typography>
            <Slider
              name="restaurantPrice"
              value={formData.restaurantPrice}
              onChange={handleSliderChange('restaurantPrice')}
              step={1}
              marks={sliderMarks}
              min={1}
              max={5}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ mb: -1 }}>
            <Typography variant="h6">Groceries</Typography>
            <Typography variant="subtitle1">How important is this to you?</Typography>
            <Slider
              name="groceryProximity"
              value={formData.groceryProximity}
              onChange={handleSliderChange('groceryProximity')}
              step={1}
              marks={sliderMarks}
              min={1}
              max={5}
              valueLabelDisplay="auto"
            />
            <Typography variant="subtitle1" sx={{ mt: 1 }}>How big is your budget?</Typography>
            <Slider
              name="groceryPrice"
              value={formData.groceryPrice}
              onChange={handleSliderChange('groceryPrice')}
              step={1}
              marks={sliderMarks}
              min={1}
              max={5}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ mb: -1 }}>
            <Typography variant="h6">Gyms</Typography>
            <Typography variant="subtitle1">How important is this to you?</Typography>
            <Slider
              name="gymProximity"
              value={formData.gymProximity}
              onChange={handleSliderChange('gymProximity')}
              step={1}
              marks={sliderMarks}
              min={1}
              max={5}
              valueLabelDisplay="auto"
            />
            <Typography variant="subtitle1" sx={{ mt: 1 }}>How big is your budget?</Typography>
            <Slider
              name="gymPrice"
              value={formData.gymPrice}
              onChange={handleSliderChange('gymPrice')}
              step={1}
              marks={sliderMarks}
              min={1}
              max={5}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ mb: -1 }}>
            <Typography variant="h6">Maintenance</Typography>
            <Typography variant="subtitle1">How upscale do you want to live?</Typography>
            <Slider
              name="serviceImportance"
              value={formData.serviceImportance}
              onChange={handleSliderChange('serviceImportance')}
              step={1}
              marks={sliderMarks}
              min={1}
              max={5}
              valueLabelDisplay="auto"
            />
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Form;
