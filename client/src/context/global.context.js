import React, { createContext, useReducer } from 'react'

//@info Reducer
const AppReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        payload
      };
    default:
      return state;
  }
};


//@info Example State
const initialState = {
  example: [
    { id: 1, text: 'Flower' },
    { id: 2, text: 'Salary' },
    { id: 3, text: 'Book' },
    { id: 4, text: 'Camera' },
  ],
};

//@info Create Context
export const GlobalContext = createContext(initialState);

//@info Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <GlobalContext.Provider value={(state, dispatch)}>
      {children}
    </GlobalContext.Provider>
  );
};