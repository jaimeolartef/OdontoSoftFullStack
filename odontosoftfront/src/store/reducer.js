
const initialState = {
  isLoggedIn: false,
  username: ''
}

const reducer = (state = initialState, action ) => {
  switch (action.type) {
    case 'ON_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload
      }
  }
  return state;
}

export default reducer;