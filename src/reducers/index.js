const initialState = {
  user: {},
  selected: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_UESR':
      return {...state, user: action.user};
    case 'SELECTED_NEW_USER':
      return {...state, selected: action.selected}
    default:
      return state;
  }
}

export default reducer;
