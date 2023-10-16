const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, id: action.id, user: action.user };

    case 'SIGNUP':
      return { ...state, user: action.user };

    case 'LOGOUT':
      return {};

    case 'SET_USER_TOKEN':
      return { ...state, id: action.id, token: action.token };

    default:
      return state;
  }
};

export default authReducer;
