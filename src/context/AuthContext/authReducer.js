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
      case "UPDATE_USER":
        return{
          ...state,
          user:action.payload
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
  