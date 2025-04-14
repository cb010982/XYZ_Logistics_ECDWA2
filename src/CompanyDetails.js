import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Link,
  Stack
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function CompanyForm() {
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = async () => {
    try {
      const idToken = localStorage.getItem('idToken');
      if (!idToken) {
        alert('User not authenticated');
        return;
      }
  
      const payload = {
        companyName,
        contactEmail,
        region,
      };
  
      console.log('Submitting company data:', payload);
  
      const response = await fetch('https://c1untjku0m.execute-api.us-east-1.amazonaws.com/companydataapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      console.log('API response:', response.status, data);
  
      if (response.ok) {
        alert('Company details saved!');
        window.location.href = '/upload'; 
      }
       else {
        alert(`Error: ${data.error || 'Failed to save details.'}`);
      }
    } catch (err) {
      console.error('Error saving company details:', err);
      alert('Error saving details.');
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',    // One row
        minHeight: '100vh', // Full vertical height
        width: '100%',
      }}
    >
      {/* LEFT SIDE (WHITE AREA) */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column', // Column so we can have content and footer
          backgroundColor: '#fff',
        }}
      >
     
          <Box
            sx={{
              flex: 1, // Take remaining vertical space
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center', // Center vertically
              p: 4,
            }}
          >
            <Box sx={{ maxWidth: 400, width: '100%' }}>
              {/* Back to dashboard link aligned to left */}
              <Box
                sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 4, // Add more space below the link
            textAlign: 'left',
            position: 'absolute', // Move the link to the top
            top: '20px', // Adjust the vertical position
            left: '216px', // Align with the left margin of the "Sign Up" heading
            width: '100%', // Ensure it spans the container width
            maxWidth: 400, // Match the width of the form container
                }}
              >
                <ArrowBackIosNewIcon sx={{ color: '#b1b7d2', mr: 1, fontSize: 18 }} />
                <Link
            href="/dashboard"
            sx={{
              color: '#a9aed0',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              '&:hover': { textDecoration: 'none' }, // Remove underline on hover
            }}
                >
            Back to dashboard
                </Link>
              </Box>

              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: '#2b3674', fontWeight: 'bold' }}
              >
                Company Details
              </Typography>

              <Typography variant="body2" sx={{ mb: 3, color: '#b1b7d2' }}>
                Join us and start your journey today!
              </Typography>

            <Stack spacing={2} sx={{ mb: 3 }}>
              {/* Name Field */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: '#2b3674', fontWeight: 600, mb: 0.5 }}
                >
                  Company Name *
                </Typography>
                <TextField
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '& fieldset': {
                        borderColor: '#F2F2F2',
                        borderWidth: '0.5px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#F2F2F2',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#623CEA',
                        borderWidth: '1.5px',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '14px 14px',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#828ebc',
                      opacity: 1,
                      fontSize: '0.8rem',
                    },
                  }}
                />
              </Box>

              {/* Email Field */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: '#2b3674', fontWeight: 600, mb: 0.5 }}
                >
                  Contact Email *
                </Typography>
                <TextField
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="mail@example.com"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '& fieldset': {
                        borderColor: '#F2F2F2',
                        borderWidth: '1px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#F2F2F2',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#623CEA',
                        borderWidth: '1.5px',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '14px 14px',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#828ebc',
                      opacity: 1,
                      fontSize: '0.8rem',
                    },
                  }}
                />
              </Box>

              {/* Region Field */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: '#2b3674', fontWeight: 600, mb: 0.5 }}
                >
                  Region *
                </Typography>
                <TextField
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Region"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '& fieldset': {
                        borderColor: '#F2F2F2',
                        borderWidth: '0.5px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#F2F2F2',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#623CEA',
                        borderWidth: '1.5px',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '14px 14px',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#828ebc',
                      opacity: 1,
                      fontSize: '0.8rem',
                    },
                  }}
                />
              </Box>
            </Stack>

            {/* Sign Up Button */}
            <Button
               onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#4318ff',
                color: '#fff',
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 500,
                py: 1.2,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#4318ff',
                  boxShadow: 'none',
                },
              }}
            >
              Done!
            </Button>

            {/* Footer Link */}
          </Box>
        </Box>

        {/* FOOTER ON THE LEFT COLUMN */}
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ color: '#b1b7d2', textAlign: 'center' }}>
            © 2025 made by Senuji Pathirage
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE (IMAGE BACKGROUND) */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          backgroundImage: 'url(/images/auth_background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: '120px', // Add border radius to curve the bottom-left corner
          overflow: 'hidden', // Ensure the border radius is applied properly
        }}
      />
    </Box>
  );
}