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

export const confirmOrder = async (dispatch, orderStock, productId) => {
  try {
    const { data } = await axios.post('/api/v1/orders/confirm', { productId, quantity: orderStock });
    const ordersIdAsJson = localStorage.getItem('orders');
    if (ordersIdAsJson) {
      const ordersId = JSON.parse(ordersIdAsJson);
      localStorage.setItem('orders', JSON.stringify([...ordersId, { orderId: data.data._id }]));
    } else {
      localStorage.setItem('orders', JSON.stringify([{ orderId: data.data._id }]));
    }
    toast.success('Przyjęto twoje zamówienie. Oczekuj na potwierdzenie.', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: 'CONFRIM_ORDERS',
      payload: data.data,
    });
    return { success: true, error: false };
  } catch (error) {
    let errorMsg = 'Coś poszło nie tak. Spróbuj ponownie później.';
    if (error.response.status === 404) errorMsg = 'Wybrano błędny produkt';
    if (error.response.status === 400) errorMsg = 'Brak produktów w magazynie';
    toast.error(errorMsg, {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return { success: false, error: true };
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
