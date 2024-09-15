import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
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

const Form = ({data, setData}) => {
  const [formData, setFormData] = useState({
    school: null,
    maxRent: '', // Add max rent
    minBeds: '', // Add min beds
    maxBeds: '', // Add max beds
    minBaths: '', // Add min baths
    maxBaths: '', // Add max baths
    hasCar: '',
    groceryPriority: 1,
    restaurantPriority: 1,
    gymPriority: 1,
    socialPriority: 1, // Add proximity to social activities
    campusPriority: 1 // Add proximity to campus
  });
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);

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

    console.log(submissionData)

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://vthacks.eba-gx8k6bzb.us-west-2.elasticbeanstalk.com/user-preferences',
        submissionData,
        {
            headers: {
                'Content-Type': 'application/json',  // Specify JSON content type
                'Authorization': `Token ${token}`,  // Include the token for authorization
            },
        }
      );
      setResponseData(response.data);
      console.log(response.data);
      setData(response.data);

    
      console.log('Form submitted successfully:', response.data);
      if(response.status == 200) {
        navigate('/');

      }
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
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');


        try {
          const response = await axios.get(
              `http://vthacks.eba-gx8k6bzb.us-west-2.elasticbeanstalk.com/uni?query=${encodeURIComponent(
                  inputValue
              )}`,
              {
                headers: {
                  // Set the token in the Authorization header
                  Authorization: `Token ${token}`,
                },
              }
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
        

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Grid container spacing={3}>
            {/* Left Side: Other Form Fields */}
            <Grid item xs={12} md={6}>
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
                  <TextField {...params} label="School" variant="outlined" fullWidth required />
                )}
              />

              {/* Maximum Rent */}
              <TextField
                label="Maximum Rent ($)"
                name="maxRent"
                type="number"
                value={formData.maxRent}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mt: 2 }}
              />

              {/* Min/Max Beds and Baths */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Min Beds"
                    name="minBeds"
                    type="number"
                    value={formData.minBeds}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Max Beds"
                    name="maxBeds"
                    type="number"
                    value={formData.maxBeds}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Min Baths"
                    name="minBaths"
                    type="number"
                    value={formData.minBaths}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Max Baths"
                    name="maxBaths"
                    type="number"
                    value={formData.maxBaths}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              {/* Radio Buttons for Car and Parking */}
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">Do you have a car?</FormLabel>
                <RadioGroup
                  row
                  aria-label="hasCar"
                  name="hasCar"
                  value={formData.hasCar}
                  onChange={handleChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

            
            </Grid>

            {/* Right Side: Sliders */}
            <Grid item xs={12} md={6}>
              {/* Proximity to Campus */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Campus</Typography>
                <Typography variant="subtitle1">How important is it to be close to campus?</Typography>
                <Slider
                  name="campusPriority"
                  value={formData.campusProximity}
                  onChange={handleSliderChange('campusPriority')}
                  step={1}
                  marks={sliderMarks}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </Box>

              {/* Restaurants */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Restaurants</Typography>
                <Typography variant="subtitle1">How important are nearby restaurants?</Typography>
                <Slider
                  name="restaurantPriority"
                  value={formData.restaurantProximity}
                  onChange={handleSliderChange('restaurantPriority')}
                  step={1}
                  marks={sliderMarks}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                    
                  />
                </Box>
  
                {/* Groceries */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Groceries</Typography>
                  <Typography variant="subtitle1">How important is a nearby grocery store?</Typography>
                  <Slider
                    name="groceryPriority"
                    value={formData.groceryProximity}
                    onChange={handleSliderChange('groceryPriority')}
                    step={1}
                    marks={sliderMarks}
                    min={1}
                    max={5}
                    valueLabelDisplay="auto"
                  />
                </Box>
  
                {/* Gyms */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Gyms</Typography>
                  <Typography variant="subtitle1">How important is a nearby gym?</Typography>
                  <Slider
                    name="gymPriority"
                    value={formData.gymProximity}
                    onChange={handleSliderChange('gymPriority')}
                    step={1}
                    marks={sliderMarks}
                    min={1}
                    max={5}
                    valueLabelDisplay="auto"
                  />
                </Box>
  
                {/* Social Activities */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Entertainment</Typography>
                  <Typography variant="subtitle1">How important are social activities?</Typography>
                  <Slider
                    name="socialPriority"
                    value={formData.socialProximity}
                    onChange={handleSliderChange('socialPriority')}
                    step={1}
                    marks={sliderMarks}
                    min={1}
                    max={5}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </Grid>
            </Grid>
  
            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    );
};

export default Form;
