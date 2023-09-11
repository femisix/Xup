import { createContext } from 'react';
import { useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  //for the initial state, there is nothing happening
  user: {
    _id: '647562f6d49cb3e1177b6da8',
    email: 'jane@email.com',
    profilepicture: 'rafaella-mendes-diniz-et_78QkMMQs-unsplash.jpg',
    coverpicture: 'susan-g-komen-3-day-wPVEHAQsYQw-unsplash.jpg',
    followers: [],
    followings: [],
    isAdmin: false,
    userName: 'Jane',
  },
  isFetching: false, //this decides the begining and the ending of the process
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); // the reducer decides which property to update in the initial state

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//the children above can be the app.js or index.js
