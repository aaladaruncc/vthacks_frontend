import React, { useState } from 'react';
import { Box, Typography, CardMedia } from '@mui/material';

const PropertyList = ({ geoJson, center, setCenter }) => {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const { features = [] } = geoJson || {};  // Provide a default empty array for properties

    const handleSelectProperty = (id) => {
        setSelectedProperty(id);
        setCenter(id);
        console.log("Centering on property", id)
        // Set the center to the selected property
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {features.map((feature, index) => {
                const isSelected = selectedProperty === feature.id;
                const isCentered = center === feature.id;  // Check if the feature is the currently centered one
                const { name, description, price, score, image, size } = feature.properties;  // Extract properties from each feature

                return (
                    <Box
                        key={feature.id || index}
                        onClick={() => handleSelectProperty(feature.id)}
                        sx={{
                            padding: 2,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#f5f5f5' : (isCentered ? '#e0f7fa' : '#ffffff'),  // Highlight the centered property
                            transition: 'background-color 0.3s ease, max-height 0.7s ease', // Smooth transition for background and height
                            overflow: 'hidden', // Prevents content overflow when collapsing
                            maxHeight: isSelected ? '500px' : '200px', // Adjust max-height for expand/collapse effect
                        }}
                    >
                        <Typography variant={isSelected ? 'h4' : 'h6'}>
                            {name}
                        </Typography>

                        <Typography variant="body2">{description}</Typography>
                        <Typography variant="body2"><strong>Price:</strong> ${price}</Typography>
                        <Typography variant="body2"><strong>Score:</strong> {score}</Typography>
                        {size && <Typography variant="body2"><strong>Size:</strong> {size}</Typography>}

                        {/* Conditionally render the image with smooth fade-in and expand */}
                        {isSelected && (
                            <CardMedia
                                component="img"
                                height="200"
                                image={image}
                                alt={name}
                                sx={{
                                    borderRadius: 2,
                                    marginTop: 2,
                                    animation: 'fadeIn 0.5s ease-in-out', // Fade-in animation for image
                                    '@keyframes fadeIn': {
                                        from: { opacity: 0 },
                                        to: { opacity: 1 },
                                    },
                                }}
                            />
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

export default PropertyList;
