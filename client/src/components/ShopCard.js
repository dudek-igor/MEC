import { useEffect, useState, useContext } from 'react';
// import Cart from '@mui/material/Cart';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import Divider from '@mui/material/Divider';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { GlobalContext } from '../context/global.context';
import { fetchOrders } from '../actions/global.actions';
import Slide from '@mui/material/Slide';

const ShopCart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    fetchOrders(dispatch);
  }, [dispatch]);
  return (
    <>
      <SwipeableDrawer anchor="right" open={cartOpen} onOpen={() => setCartOpen(true)} onClose={() => setCartOpen(false)}>
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '414px',
            },
          }}
          role="presentation"
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              mr: 2,
              ml: 3,
            }}
          >
            <Typography sx={{ pt: 2 }} variant="h6" align="right" paragraph>
              Twoje Zam??wienia
            </Typography>
            <IconButton onClick={() => setCartOpen(false)} component="span">
              <CloseOutlinedIcon fontSize="large" />
            </IconButton>
          </Box>
          <Divider />

          <List sx={{ m: 0 }}>
            {state.orders.map(({ _id, status, name, quantity, sold_price: soldPrice }, index) => (
              <ListItem key={_id} sx={{ pt: 0 }}>
                <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                  {status === 'PENDING' ? (
                    <HourglassEmptyRoundedIcon color="info" />
                  ) : status === 'REJECTED' ? (
                    <ErrorOutlineIcon color="error" />
                  ) : (
                    <DoneOutlineRoundedIcon color="success" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={`${quantity} x ${name.charAt(0).toUpperCase() + name.slice(1)}`}
                  secondary={
                    <>
                      <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
                        Status:{' '}
                        {status === 'PENDING'
                          ? 'Oczekuje na potwierdzenie'
                          : status === 'REJECTED'
                          ? 'Zam??wienie zosta??o odrzucone'
                          : 'Zam??wienie zosta??o przyj??te'}
                      </Typography>
                      <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
                        Cena: {((soldPrice * quantity) / 100).toFixed(2)} z??
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
        <Slide direction="left" in={true} timeout={666}>
          <Button
            variant="contained"
            sx={{
              zIndex: 1,
              position: 'fixed',
              bottom: 150,
              right: 0,
              height: 80,
              textTransform: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
            onClick={() => setCartOpen(true)}
          >
            <Typography>Zam??wienia</Typography>
            <Badge color="secondary" badgeContent={state.orders?.length}>
              <ShoppingBasketOutlinedIcon />
            </Badge>
          </Button>
        </Slide>
    </>
  );
};

export default ShopCart;
