import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Grid,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';

const FormPage = () => {
  const [formData, setFormData] = useState({
    school: null,
    restaurantProximity: 1,
    restaurantPrice: 1,
    groceryProximity: 1,
    groceryPrice: 1,
    gymProximity: 1,
    gymPrice: 1,
    serviceImportance: 1,
    hasCar: '',
    needsParking: '',
  });

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSliderChange = (name) => (e, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      schoolId: formData.school ? formData.school.id : null,
    };

    delete submissionData.school;

    try {
      const response = await axios.post(
          'http://vthacks.eba-gx8k6bzb.us-west-2.elasticbeanstalk.com/userdata',
          submissionData
      );
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const sliderMarks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue === '') {
        setOptions([]);
        return;
      }

      if (formData.school && inputValue === formData.school.name) {
        setOptions([]);
        return;
      }

      const fetchSchools = async () => {
        try {
          const response = await axios.get(
              `http://vthacks.eba-gx8k6bzb.us-west-2.elasticbeanstalk.com/uni?query=${encodeURIComponent(
                  inputValue
              )}`
          );
          console.log('Fetched schools:', response.data);
          setOptions(response.data);
        } catch (error) {
          console.error('Error fetching schools:', error);
        }
      };

      fetchSchools();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, formData.school]);

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
                gap: '16px',
              }}
          >
            {/* School Autocomplete Input */}
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.name}
                filterOptions={(x) => x} // Disable built-in filtering
                inputValue={inputValue}
                onInputChange={(event, newInputValue, reason) => {
                  if (reason === 'input') {
                    setInputValue(newInputValue);
                  }
                }}
                value={formData.school}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    school: newValue,
                  });
                  setInputValue(newValue ? newValue.name : '');
                  setOptions([]);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="School"
                        variant="outlined"
                        fullWidth
                        required
                    />
                )}
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

export default FormPage;
