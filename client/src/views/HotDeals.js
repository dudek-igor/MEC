import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Style Components
// import { Button } from '../../components/buttons/Buttons';
// import { StyledLoader, StyledWrapper } from './Dashboard.styled';

const HotDeals = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    // 1. After Component Mount => get User
    (async () => {
      try {
        // Get Data
        const data = await axios.get('/api/v1/products/hot-deals');
        // If ok set user with data
        console.log(data);
        
      } catch (error) {
       // Handle Error
      }
    })();
  }, []);

  return (
    <div> hello hot deals </div>
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

export default HotDeals