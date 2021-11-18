import React, {useState} from 'react';
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


const ProductCard = ({ data: { name, stock, price } }) => {
const [orderStock, setOrderStock] = useState(0);
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',  alignContent: 'center'  }}>
        <CardContent sx={{  textAlign: 'center', flexGrow: '1'  }}>
          <Typography gutterBottom variant="h5" component="h2">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
        </CardContent>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography>Dostępność: {stock} sztuk</Typography>
          <Typography>Cena: {(price / 100).toFixed(2)} zł</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'  }}>
          <ButtonGroup size="small">
          <IconButton onClick={()=> orderStock > 0 && setOrderStock(orderStock - 1)} color="error">
                <RemoveIcon />
            </IconButton>
            <Button variant="text" sx={{color: 'black'}} >{orderStock}</Button>
            <IconButton onClick={()=>orderStock <= stock && setOrderStock(orderStock + 1)} color="success" >
                <AddIcon />
            </IconButton>
          </ButtonGroup>
          <Button disabled={orderStock < 1} variant="outlined">Zamów Teraz</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
