const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
        isAuthenticated: false,
      };

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        isAuthenticated: true,
      };

    case 'LOGIN_FAILURE':
      return {
        user: null,
        isFetching: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case 'REGISTER_START':
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        error: false,
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};

export default AuthReducer;
