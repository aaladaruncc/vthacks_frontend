import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Form = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    school: null,
    maxRent: '',
    minBeds: '',
    maxBeds: '',
    minBaths: '',
    maxBaths: '',
    hasCar: '',
    groceryPriority: 1,
    restaurantPriority: 1,
    gymPriority: 1,
    entertainmentPriority: 1,
    campusDistancePriority: 1
  });
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert numerical values to numbers
    setFormData(prevData => ({
      ...prevData,
      [name]: name.includes('Priority') ? parseInt(value, 10) : value,
    }));
  };

  const handleSliderChange = (name) => (e, newValue) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      maxRent: formData.maxRent ? parseInt(formData.maxRent, 10) : null,
      minBeds: formData.minBeds ? parseInt(formData.minBeds, 10) : null,
      maxBeds: formData.maxBeds ? parseInt(formData.maxBeds, 10) : null,
      minBaths: formData.minBaths ? parseInt(formData.minBaths, 10) : null,
      maxBaths: formData.maxBaths ? parseInt(formData.maxBaths, 10) : null,
      campusDistancePriority: parseInt(formData.campusDistancePriority, 10),
      restaurantPriority: parseInt(formData.restaurantPriority, 10),
      groceryPriority: parseInt(formData.groceryPriority, 10),
      gymPriority: parseInt(formData.gymPriority, 10),
      entertainmentPriority: parseInt(formData.entertainmentPriority, 10),
      schoolId: formData.school ? formData.school.id : null,
    };

    delete submissionData.school;

    console.log(submissionData);

    try {
      const response = await axios.post(
        'https://api.edukona.com/user-preferences/',
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token df4e0d7c28242b0ca9802200b6d36d75c24d2f36`,
          },
        }
      );
      setResponseData(response.data);
      console.log(response.data.message);
      setData(response.data.message);

      if (response.status === 200) {
        navigate('/dashboard');
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
        try {
          const response = await axios.get(
            `http://vthacks.eba-gx8k6bzb.us-west-2.elasticbeanstalk.com/uni?query=${encodeURIComponent(inputValue)}`,
            {
              headers: {
                Authorization: `Token df4e0d7c28242b0ca9802200b6d36d75c24d2f36`,
              },
            }
          );
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
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={options}
                getOptionLabel={(option) => option.name}
                filterOptions={(x) => x}
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
                    school: newValue ? { ...newValue, id: String(newValue.unitid) } : null,
                  });
                  setInputValue(newValue ? newValue.name : '');
                  setOptions([]);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="School" variant="outlined" fullWidth required />
                )}
              />

              <TextField
                label="Maximum Rent ($)"
                name="maxRent"
                type="number"
                value={formData.maxRent || ''}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mt: 2 }}
              />

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Min Beds"
                    name="minBeds"
                    type="number"
                    value={formData.minBeds || ''}
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
                    value={formData.maxBeds || ''}
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
                    value={formData.minBaths || ''}
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
                    value={formData.maxBaths || ''}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

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

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Campus</Typography>
                <Typography variant="subtitle1">How important is it to be close to campus?</Typography>
                <Slider
                  name="campusDistancePriority"
                  value={formData.campusDistancePriority}
                  onChange={handleSliderChange('campusDistancePriority')}
                  step={1}
                  marks={sliderMarks}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Restaurants</Typography>
                <Typography variant="subtitle1">How important are nearby restaurants?</Typography>
                <Slider
                  name="restaurantPriority"
                  value={formData.restaurantPriority}
                  onChange={handleSliderChange('restaurantPriority')}
                  step={1}
                  marks={sliderMarks}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Groceries</Typography>
                <Typography variant="subtitle1">How important is a nearby grocery store?</Typography>
                <Slider
                  name="groceryPriority"
                  value={formData.groceryPriority}
                  onChange={handleSliderChange('groceryPriority')}
                  step={1}
                  marks={sliderMarks}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Gyms</Typography>
                <Typography variant="subtitle1">How important is a nearby gym?</Typography>
                <Slider
                  name="gymPriority"
                  value={formData.gymPriority}
                  onChange={handleSliderChange('gymPriority')}
                  step={1}
                  marks={sliderMarks}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Entertainment</Typography>
                <Typography variant="subtitle1">How important are social activities?</Typography>
                <Slider
                  name="entertainmentPriority"
                  value={formData.entertainmentPriority}
                  onChange={handleSliderChange('entertainmentPriority')}
                  step={1}
                  marks={sliderMarks}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </Box>
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Form;
