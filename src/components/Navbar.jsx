import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFirebase } from '../context/firebaseAuth';

function Navbar() {

  const navigate = useNavigate();

  const firebase = useFirebase();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00215E' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/'>
            <img src={logo} alt="Logo" style={{ display: { xs: 'none', md: 'flex' }, marginRight: 1, width: '50px', height: '50px' }} />
          </Link>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            OCS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          
          {firebase?.user?.email && (
            <>
            <Box sx={{ flexGrow: 0 }}>
              <Button color="inherit" sx={{ color: 'white' }} onClick={() => firebase.logout()}>
                Logout
              </Button>
            </Box>
          </>
        )}
          { !firebase?.user?.email && (
            <>
              <Link to='/login' sx={{ textDecoration: 'none', color: 'white' }} >
                <Box sx={{ flexGrow: 0 }}>
                <Button color="inherit" sx={{ color: 'white' }}>
                  Login
                </Button>
              </Box>
            </Link>
          </>
        )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
