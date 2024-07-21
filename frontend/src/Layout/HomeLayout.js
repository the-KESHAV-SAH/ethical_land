import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/dashboard/Navbar';
import { Button, Typography, Container, Paper, Box } from '@mui/material';
import { SportsEsports, AdminPanelSettings } from '@mui/icons-material'; // Import Material-UI icons
import backgroundImage from './ode.png';

const HomeLayout = ({ currentPage, handleLogout, navigate, children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/'; // Check if it's the home page
  const user = useSelector((state) => state.Auth.user);
  const userName = user?.name || 'Coder'; // Fallback name if user is not logged in
  const googleUser = JSON.parse(localStorage.getItem('user'));

  // Determine the welcome message based on the presence of googleUser
  const welcomeMessage = googleUser ? `Hello, ${googleUser.displayName}` : `Hello, ${userName}`;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } },
  };

  return (
    <>
      <Navbar currentPage={currentPage} handleSignOut={handleLogout} navigate={navigate} />

      {isHomePage && (
        <motion.div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Container maxWidth="lg" sx={{ px: 4, py: 8, textAlign: 'center' }}>
            <motion.div
              component={Paper}
              elevation={4}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: 2,
                p: 4,
                mb: 4,
                color: 'white',
                textAlign: 'center',
              }}
              variants={cardVariants}
            >
              <Typography variant="h2" component="h2" gutterBottom>
                {welcomeMessage}
              </Typography>
              <Typography variant="h5" paragraph>
              The best way to predict the future is to invent it
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<SportsEsports />}
                  onClick={() => navigate('/get-problem')}
                >
                  Practice
                </Button>
                {user && user.role === 'admin' && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AdminPanelSettings />}
                    onClick={() => navigate('/admin')}
                  >
                    Go To Admin
                  </Button>
                )}
              </Box>
            </motion.div>
          </Container>
        </motion.div>
      )}

      {/* Render children for dynamic content */}
      {children}
    </>
  );
};

export default HomeLayout;