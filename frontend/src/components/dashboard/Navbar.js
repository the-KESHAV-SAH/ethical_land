import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../dashboard/Logo.png';
import { Logout } from '../../redux/AuthSlice';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { post } from '../../services/apiEndpoint';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Typography, Box } from '@mui/material';
import { FaUser, FaAngleDown, FaPlus, FaEdit, FaBook, FaTrophy, FaBlog, FaClipboardList } from 'react-icons/fa';
import GoogleIcon from '@mui/icons-material/Google'; // Ensure this is the correct path

const Navbar = ({ currentPage }) => {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      const response = await post('/api/auth/logout');
      await signOut(auth);
      if (response.status === 200) {
        dispatch(Logout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        navigate('/login');
        toast.success('Successfully logged out');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    navigate('/update-problem');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <img src={logo} alt="Your Company Logo" style={{ height: 50, marginRight: 16 }} />
        </Link>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Button
            component={Link}
            to="/get-problem"
            color={currentPage === 'get-problem' ? 'secondary' : 'inherit'}
            startIcon={<FaClipboardList />}
          >
            Problems
          </Button>
          {/* <Button
            component={Link}
            to="/course"
            color={currentPage === 'course' ? 'secondary' : 'inherit'}
            startIcon={<FaBook />}
          >
            Courses
          </Button> */}
          <Button
            component={Link}
            to="/contest"
            color={currentPage === 'contest' ? 'secondary' : 'inherit'}
            startIcon={<FaTrophy />}
          >
            Compete
          </Button>
          <Button
            component={Link}
            to="/blog"
            color={currentPage === 'blog' ? 'secondary' : 'inherit'}
            startIcon={<FaBlog />}
          >
            Blogs
          </Button>
          {user && user.role === 'admin' && (
            <>
              <Button
                component={Link}
                to="/problem/new"
                color={currentPage === 'new' ? 'secondary' : 'inherit'}
                startIcon={<FaPlus />}
              >
                Add Problem
              </Button>
              <Button
                onClick={handleUpdate}
                color="primary"
                variant="contained"
                startIcon={<FaEdit />}
                sx={{ ml: 2 }}
              >
                Update Problem
              </Button>
            </>
          )}
        </Box>
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
        >
          <FaUser />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/profile">Profile</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
