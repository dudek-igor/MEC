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
        hot_deals_products: payload,
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
    default:
      return state;
  }
};

//@info Example State
const initialState = {
  products: [],
  hot_deals_products: [],
  orders: [],
};

//@info Create Context
export const GlobalContext = createContext();

//@info Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};
