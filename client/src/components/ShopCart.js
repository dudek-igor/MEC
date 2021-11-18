import { useEffect, useState } from 'react';
import axios from 'axios';
// import Cart from '@mui/material/Cart';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { GlobalContext } from '../context/global.context';
import { fetchProducts } from '../actions/global.actions';

const ShopCart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => {
 
    (async () => {
      try {
        // Get Data
        const ordersIdAsJson = localStorage.getItem('orders');
        if (ordersIdAsJson) {
          const ordersId = JSON.parse(ordersIdAsJson);
          const data = await axios.post('/api/v1/orders', ordersId);
          // If ok set user with data
          console.log(data);
        }
      } catch (error) {
        // Handle Error
      }
    })();
  }, []);
  return (
    <>
      <SwipeableDrawer anchor="right" open={cartOpen} onOpen={() => setCartOpen(true)}  onClick={() => setCartOpen(false)}>
        <Box sx={{  width: '414px' }} role="presentation">
          <Box sx={{
             display: 'flex',
             flexWrap: 'wrap',
             flexDirection: 'row',
             justifyContent: 'space-between',
             alignItems: 'center',
             mr: 2, 
             ml: 3
          }}>
          <Typography sx={{pt:2}} variant="h6" align="right" paragraph>
              Your Orders
          </Typography>
          <IconButton  onClick={() => setCartOpen(false)} component="span">
            <CloseOutlinedIcon fontSize="large"  />
          </IconButton>
          </Box>
          <Divider />


          <List  sx={{m:0}}>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem sx={{pt:0}} button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          
        </Box>
      </SwipeableDrawer>

      <Button onClick={() => setCartOpen(true)}>
        {/* <Badge badgeContent={getTotalItems(cartItems)} color="error">
          {/* <AddShoppingCart /> */}
        {/* </Badge> */}
        open
      </Button>
    </>
  );
};

export default ShopCart;
