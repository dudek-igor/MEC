import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import SendIcon from '@mui/icons-material/Send';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Fade from '@mui/material/Fade';
import { GlobalContext } from '../context/global.context';
import { confirmOrder } from '../actions/global.actions';

const ProductCard = ({ data: { name, price, stock, productId, index } }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [orderStock, setOrderStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(GlobalContext);
  const handleInputChange = value => {
    const numericPattern = /^\d+$/;
    if (value === '0' || !value) {
      setInputError(null);
      setInputValue(0);
    } else if (!numericPattern.test(value) || value.startsWith('-')) {
      setInputError('Wartość musi być liczbą całkowitą dodatnią');
    } else if (value.startsWith('0')) {
      setInputError("Wartość nie może zaczynać się od '0'");
    } else if (+value > stock) {
      setInputError('Wartość jest wyższa niż dostępny stan');
    } else {
      setInputError(null);
      setInputValue(+value);
    }
  };
  const handleSubmit = () => {
    setOrderStock(inputValue);
    setCartOpen(false);
  };
  const setupOrder = async productId => {
    setLoading(true);
    const { success } = await confirmOrder(dispatch, orderStock, productId);
    if (success) {
      setOrderStock(0);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer anchor={'bottom'} open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }} role="presentation">
          <Paper sx={{ my: 4, pb: 4, width: 300, display: 'flex', flexDirection: 'column' }} elevation={3}>
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
              <Typography sx={{ pt: 2 }} variant="h6" align="center" paragraph>
                Wprowadź ilość
              </Typography>
              <IconButton
                sx={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end' }}
                onClick={() => setCartOpen(false)}
                component="span"
              >
                <CloseOutlinedIcon fontSize="large" />
              </IconButton>
            </Box>
            <FormControl sx={{ mx: 3 }} variant="standard">
              <TextField
                autoComplete="off"
                onChange={e => handleInputChange(e.target.value)}
                error={!!inputError}
                placeholder={`Aktualna ilość: ${orderStock}`}
                id="order_stock"
                type="number"
                variant="standard"
              />
              <FormHelperText sx={{ py: 0, my: 0 }} error id="order_stock">
                {inputError}
              </FormHelperText>
            </FormControl>
            <Button
              sx={{ mt: 2, mx: 'auto', width: 150 }}
              onClick={() => handleSubmit()}
              disabled={!!inputError || orderStock < 0 || inputValue === 0}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Zatwierdź
            </Button>
          </Paper>
        </Box>
      </Drawer>
      <Fade in={true} timeout={index * 400}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'center' }}>
            <CardContent sx={{ textAlign: 'center', flexGrow: '1' }}>
              <Typography gutterBottom variant="h5" component="h2">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
            </CardContent>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography>Dostępność: {stock} sztuk</Typography>
              <Typography>Cena: {(price / 100).toFixed(2)} zł</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <ButtonGroup>
                <IconButton
                  disabled={orderStock < 1}
                  sx={{ px: 1 }}
                  size="small"
                  onClick={() => orderStock > 0 && setOrderStock(orderStock - 1)}
                  color="error"
                >
                  <RemoveIcon />
                </IconButton>
                <Button onClick={() => setCartOpen(true)} variant="text" sx={{ color: 'black' }}>
                  {orderStock}
                </Button>
                <IconButton disabled={orderStock >= stock} onClick={() => orderStock <= stock && setOrderStock(orderStock + 1)} color="success">
                  <AddIcon />
                </IconButton>
              </ButtonGroup>
              <Button onClick={() => setupOrder(productId)} disabled={orderStock < 1 || loading} variant="outlined">
                {loading ? 'Loading...' : 'Zamów Teraz'}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Fade>
    </>
  );
};

export default ProductCard;
