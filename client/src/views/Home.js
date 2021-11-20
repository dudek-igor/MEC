import React, { useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { ProductCard } from '../components'
import { GlobalContext } from '../context/global.context';
import { fetchProducts } from '../actions/global.actions';


const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    fetchProducts(dispatch);
  }, [dispatch]);

  return (
    <main>
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {state.products.map((data,index) => (
            <ProductCard key={data.productId} data={{...data, index}} />
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default Home;
