const defaultState = {
  currentRoute: '/',
  redirectRoute: '/login'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ROUTE':
      return {
        ...state,
        currentRoute: action.route
      };

    case 'SET_REDIRECT_ROUTE':
      return {
        ...state,
        redirectRoute: action.route
      };

    case 'RESET_CURRENT_ROUTE':
      return {
        ...state,
        currentRoute: '/'
      };

    default:
      return state;
  }
};
