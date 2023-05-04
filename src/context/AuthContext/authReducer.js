const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.access,
          error: null,
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null,
          error: action.payload.error,
        };
      case "LOGOUT":
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null,
          error: null,
        };
      default:
        return state;
    }
  };
  
export default authReducer;
  