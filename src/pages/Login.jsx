import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Button, Grid, Typography } from '@mui/material';
import Google from '@mui/icons-material/Google';
import { useFirebase } from '../context/firebaseAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleButtonClick = (role) => {
    setSelectedRole(role);
  }

  const navigate = useNavigate();
  
  const firebase = useFirebase();

  useEffect(() => {
    if(firebase.user){
      navigate('/');
    }
  }, [firebase]);


  return (
    <div>
      <Navbar/>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: 8, marginBottom: 4 }}>Login</Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ paddingLeft: 16, paddingRight:16}}>
          {['Student', 'Recruiter', 'Coordinator', 'Staff'].map((role) => (
            <Grid item xs={12} sm={6} key={role}>
              <Button
                variant="contained"
                sx={{ padding: 2, textAlign: 'center', boxShadow: 'none', backgroundColor: '#00215E', color: 'white', width: '100%', '&:hover': {backgroundColor: '#1640D6'} }}
                onClick={() => handleButtonClick(role)}
              >
                <Typography variant="h6">{role}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          {selectedRole && <Typography variant="h5">Login as: {selectedRole}</Typography>}
        </Box>

        {selectedRole && (
          <Button
            variant="contained"
            startIcon={<Google style={{ fontSize: 40 }} />}
            size="large"
            sx={{
              marginTop: 2,
              backgroundColor: '#4285F4',
              fontSize: '1.2rem',
              padding: 2,
              color: 'white',
              '&:hover': {
                backgroundColor: '#2F6CD1',
              },
            }}
            onClick={() => {
              firebase.signupWithGoogle()
            }}
          >
            Login with Google
          </Button>
        )}


      </Box>

      {/* logout button */}

      <Button
        variant="contained"
        sx={{ marginTop: 2, backgroundColor: '#FF0000', color: 'white', '&:hover': {backgroundColor: '#FF3333'} }}
        onClick={() => {
          firebase.logout()
        }}
      >
        Logout
      </Button>

    </div>
  );
}

export default Login;