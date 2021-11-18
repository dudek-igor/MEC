import { useEffect } from 'react';
import axios from 'axios';

const ShopCart = () => {
  useEffect(() => {
    // 1. After Component Mount => get User
    (async () => {
      try {
        // Get Data
        // const data = await axios.post('/api/v1/orders');
        // If ok set user with data
        // console.log(data);
      } catch (error) {
        // Handle Error
      }
    })();
  }, []);
  return <div>shop cart</div>;
};

export default ShopCart;
