import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Style Components
// import { Button } from '../../components/buttons/Buttons';
// import { StyledLoader, StyledWrapper } from './Dashboard.styled';

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    // 1. After Component Mount => get User
    (async () => {
      try {
        // Get Data
        const data = await axios.get('/api/v1/products');
        // If ok set user with data
        console.log(data);
        
      } catch (error) {
       // Handle Error
      }
    })();
  }, []);

  // Handle Logout
//   const handleLogout = async () => {
//     // Logout => Clear Session in DB & Clear App state
//     await axios('/api/v1/auth/logout');
//     setLogged(false);
//     try {
//     } catch (error) {
//       // If something went wrong clear app state
//       // console.error(error);
//       setLogged(false);
//     }
//   };

  return (
    <div>Hello  </div>
      // {user ? (
        // <StyledWrapper>
        //   <p>Hello {user.email}</p>
        //   <Button primary handleClick={handleLogout}>
        //     Log Out
        //   </Button>
        // </StyledWrapper>
    //   ) : (
        // <StyledLoader
        //   type='ThreeDots'
        //   color={theme.mainColor}
        //   height={80}
        //   width={80}
        // />
    //   )}
    // </div>
  );
};

export default Home