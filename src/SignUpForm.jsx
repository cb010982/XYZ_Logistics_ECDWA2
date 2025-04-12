import React from 'react';
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

export default function SignUpForm() {
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
                Sign Up
              </Typography>

              <Typography variant="body2" sx={{ mb: 3, color: '#b1b7d2' }}>
                Join us and start your journey today!
              </Typography>

              {/* Sign up with Google Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#f2f6fe',
                color: '#2b3674',
                textTransform: 'none',
                borderRadius: '20px',
                boxShadow: 'none',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 1.5,
                px: 2,
                '&:hover': {
                  backgroundColor: '#e6edfb',
                  boxShadow: 'none',
                },
              }}
            >
              <img
                src="/images/Google_logo.webp"
                alt="Google Logo"
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Typography variant="button" sx={{ fontWeight: 550, textTransform: 'none' }}>
                Sign up with Google
              </Typography>
            </Button>

            <Divider sx={{ mb: 3, color: '#999', fontSize: '0.875rem' }}>or</Divider>

            <Stack spacing={2} sx={{ mb: 3 }}>
              {/* Name Field */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: '#2b3674', fontWeight: 600, mb: 0.5 }}
                >
                  Name *
                </Typography>
                <TextField
                  placeholder="Your Name"
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
                  Email *
                </Typography>
                <TextField
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

              {/* Password Field */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: '#2b3674', fontWeight: 600, mb: 0.5 }}
                >
                  Password *
                </Typography>
                <TextField
                  type="password"
                  placeholder="Min. 8 characters"
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
            </Stack>

            {/* Sign Up Button */}
            <Button
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
              Sign Up
            </Button>

            {/* Footer Link */}
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link
                href="/signin"
                sx={{
                  color: '#4318ff',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Let’s Sign in
              </Link>
            </Typography>
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
