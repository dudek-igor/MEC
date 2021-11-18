import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Style Components
// import { Button } from '../../components/buttons/Buttons';
// import { StyledLoader, StyledWrapper } from './Dashboard.styled';

const HotDeals = () => {
  const [user, setUser] = useState();

//   useEffect(() => {
//     // 1. After Component Mount => get User
//     (async () => {
//       try {
//         // Get Data
//         const {
//           data: { success, user },
//         } = await axios.get('/api/v1/user');
//         // If ok set user with data
//         if (success) {
//           setUser(user);
//         }
//         // If unauthorize, clear app store/state
//         else setLogged(false);
//       } catch (error) {
//         // If error => logout user
//         // console.error(error);
//         setLogged(false);
//       }
//     })();
//     // Only Once
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

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