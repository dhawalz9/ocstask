import React from 'react';
import Navbar from '../components/Navbar';
import { useFirebase } from '../context/firebaseAuth';

const Home = () => {
  const firebase = useFirebase();
  console.log(firebase);

  return (
    <div>
      <Navbar/>
      <h1>Home</h1>
      {firebase?.user?.email && (
        <h2>Welcome, {firebase?.user?.email}</h2>
      )}
      {!firebase?.user?.email && (
        <h3>please login</h3>
      )}
    </div>
  );
}

export default Home;