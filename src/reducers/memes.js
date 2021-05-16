const memesReducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_SUCCESS':
      return {
        data: action.data,
        error: ''
      }
    case 'FETCH_ERROR':
      return {
        data: [],
        error: action.error
      }
    default:
      return state;
  }
}

export default memesReducer;