export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        id: action.id,
        user: Object.assign({}, state.user, action.user)
      };

    default:
      return state;
  }
};
