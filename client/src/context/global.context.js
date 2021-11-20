import { createContext, useReducer } from 'react';

//@info Reducer
const AppReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        products: payload,
      };
    case 'FETCH_HOT_DEALS_PRODUCTS':
      return {
        ...state,
        hotDealsProducts: payload,
      };
    case 'FETCH_ORDERS':
      return {
        ...state,
        orders: payload,
      };
    case 'CONFRIM_ORDERS':
      return {
        ...state,
        orders: [...state.orders, payload],
      };
    case 'SETUP_SOCKET_CONNECTION':
      return {
        ...state,
        socket: {
          ...state.socket,
          ...payload,
        },
      };
    case 'product.stock.decreased': //@info Confirm order and update article stock
      const order = state.orders.filter(({ _id }) => _id === payload.correlationId);
      if (order.length) {
        const productIdFromOrder = +order[0].productId; //@info When user create order, Hub do not send back productId. Only new stock :(
        return {
          ...state,
          orders: state.orders.map(({ _id, ...rest }) => (_id === payload.correlationId ? { _id, ...rest, status: 'CONFIRMED' } : { _id, ...rest })),
          products: state.products.map(({ productId, ...rest }) =>
            productId === productIdFromOrder ? { productId, ...rest, stock: payload.payload.stock } : { productId, ...rest },
          ),
          hotDealsProducts: state.hotDealsProducts.map(({ productId, ...rest }) =>
            productId === productIdFromOrder ? { productId, ...rest, stock: payload.payload.stock } : { productId, ...rest },
          ),
        };
      } else {
        return {
          ...state,
          products: state.products.map(({ productId, ...rest }) =>
            productId === payload.payload.productId ? { productId, ...rest, stock: payload.payload.stock } : { productId, ...rest },
          ),
          hotDealsProducts: state.hotDealsProducts.map(({ productId, ...rest }) =>
            productId === payload.payload.productId ? { productId, ...rest, stock: payload.payload.stock } : { productId, ...rest },
          ),
        };
      }
    case 'product.stock.decrease.failed':
      return {
        ...state,
        orders: state.orders.map(({ _id, ...rest }) => (_id === payload.correlationId ? { _id, ...rest, status: 'REJECTED' } : { _id, ...rest })),
      };
    case 'product.stock.updated': //@info Update product stock
      return {
        ...state,
        products: state.products.map(({ productId, ...rest }) =>
          productId === payload.payload.productId ? { productId, ...rest, stock: payload.payload.stock } : { productId, ...rest },
        ),
        hotDealsProducts: state.hotDealsProducts.map(({ productId, ...rest }) =>
          productId === payload.payload.productId ? { productId, ...rest, stock: payload.payload.stock } : { productId, ...rest },
        ),
      };

    default:
      return state;
  }
};

//@info Example State
const initialState = {
  products: [],
  hotDealsProducts: [],
  orders: [],
  socket: {
    connectionStatus: 'CONNECTING',
    readyState: 0
  },
};

//@info Create Context
export const GlobalContext = createContext();

//@info Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};
