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
        display: 'flex',    
        minHeight: '100vh', 
        width: '100%',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column', 
          backgroundColor: '#fff',
        }}
      >
     
          <Box
            sx={{
              flex: 1, 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center', 
              p: 4,
            }}
          >
            <Box sx={{ maxWidth: 400, width: '100%' }}>            


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

          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ color: '#b1b7d2', textAlign: 'center' }}>
            © 2025 made by Senuji Pathirage
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          backgroundImage: 'url(../images/XYZ.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: '120px', 
          overflow: 'hidden', 
        }}
      />
    </Box>
  );
}