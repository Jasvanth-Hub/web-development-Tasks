import React from 'react'
import { Typography } from '@mui/material';
import './Home.css'

const Home = () => {
  return (
    <>
      <div className="home">
        <Typography className='title' variant="h4">This is your Home Page...</Typography>
      </div>
      <footer><Typography variant='h6' >Developed by Jasvanth || copyright&copy; 2024 || All rights received.</Typography></footer>
    </>
  );
}

export default Home
