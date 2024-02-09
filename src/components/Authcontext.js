import React, { createContext, useContext, useReducer } from 'react';

const authStateContext = createContext();
const authDispatchContext = createContext();

// Define your initial authentication state
const initialAuthState = {
  user: null, // You can store user data here
  isAuthenticated: false,
  // Add any other relevant authentication data here
};

// Define your authentication reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Handle login action and update state
      return {
        ...state,
        user: action.payload, // Set the user data
        isAuthenticated: true, // Set authentication status
      };
    case 'LOGOUT':
      // Handle logout action and update state
      return {
        ...state,
        user: null, // Clear user data
        isAuthenticated: false, // Set authentication status to false
      };
    // Add more cases for other authentication actions as needed
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <authDispatchContext.Provider value={dispatch}>
      <authStateContext.Provider value={state}>
        {children}
      </authStateContext.Provider>
    </authDispatchContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(authStateContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const useDispatchAuth = () => useContext(authDispatchContext);

export { AuthProvider, useAuth, useDispatchAuth };
