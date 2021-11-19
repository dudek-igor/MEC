import React, { useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { ProductCard } from '../components'
import { GlobalContext } from '../context/global.context';
import {fetchHotDeals} from '../actions/global.actions'


const HotDeals = () => {
  const { state, dispatch } = useContext(GlobalContext);
  
  useEffect(() => {
    fetchHotDeals(dispatch);
  }, [dispatch]);

  return (
    <main>
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {state.hotDealsProducts.map((data) => (
            <ProductCard key={data.productId} data={data} />
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default HotDeals