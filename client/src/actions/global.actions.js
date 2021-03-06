import axios from 'axios';
import { ReadyState } from 'react-use-websocket';
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
      const parsed_orders = JSON.parse(ordersIdAsJson);
      const { data } = await axios.post('/api/v1/orders', {
        ordersId: parsed_orders.map(({ orderId }) => orderId),
      });
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

export const confirmOrder = async (dispatch, orderStock, productId) => {
  try {
    const { data } = await axios.post('/api/v1/orders/confirm', { productId, quantity: orderStock });
    dispatch({
      type: 'CONFRIM_ORDERS',
      payload: data.data,
    });
    const ordersIdAsJson = localStorage.getItem('orders');
    if (ordersIdAsJson) {
      const ordersId = JSON.parse(ordersIdAsJson);
      localStorage.setItem('orders', JSON.stringify([...ordersId, { orderId: data.data._id }]));
    } else {
      localStorage.setItem('orders', JSON.stringify([{ orderId: data.data._id }]));
    }
    toast.success('Przyj??to twoje zam??wienie. Oczekuj na potwierdzenie.', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    let errorMsg = 'Co?? posz??o nie tak. Spr??buj ponownie p????niej.';
    if (error.response.status === 404) errorMsg = 'Wybrano b????dny produkt';
    if (error.response.status === 400) errorMsg = 'Brak produkt??w w magazynie';
    toast.error(errorMsg, {
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

export const setupSocketConnction = async (dispatch, readyState) => {
  const connectionStatus = ReadyState[readyState];
  dispatch({
    type: 'SETUP_SOCKET_CONNECTION',
    payload: { connectionStatus, readyState },
  });
};

export const handleSocketMessages = async (dispatch, message) => {
  if (message) {
    const data = JSON.parse(message.data);
    dispatch({
      type: data.operation,
      payload: data,
    });
  }
};
