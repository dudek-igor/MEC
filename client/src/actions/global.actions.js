import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchProducts = async dispatch => {
  try {
    const { data } = await axios.get('/api/v1/products');
    dispatch({
      type: 'FETCH_PRODUCTS',
      payload: data.data,
    });
  } catch (error) {
    toast.error('Something Went Wrong. Please try again.', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const fetchHotDeals = async dispatch => {
  try {
    const { data } = await axios.get('/api/v1/products/hot-deals');
    dispatch({
      type: 'FETCH_HOT_DEALS_PRODUCTS',
      payload: data.data,
    });
  } catch (error) {
    toast.error('Something Went Wrong. Please try again.', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const fetchOrders = async dispatch => {
  try {
    const ordersIdAsJson = localStorage.getItem('orders');
    if (ordersIdAsJson) {
      const ordersId = JSON.parse(ordersIdAsJson);
      const { data } = await axios.post('/api/v1/orders', ordersId);
      dispatch({
        type: 'FETCH_ORDERS',
        payload: data.data,
      });
    }
  } catch (error) {
    toast.error('Something Went Wrong. Please try again.', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
