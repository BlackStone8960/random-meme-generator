const formReducerDefaultState = {
  texts: [''],
  fontSize: 28
}

const formReducer = (state = formReducerDefaultState, action) => {
  switch (action.type) {
    case 'INIT_FORM': 
      return {
        texts: action.texts,
        fontSize: action.fontSize
      };
    case 'UPDATE_TEXT':
      const newTexts = [...state.texts];
      newTexts[action.index] = action.text;
      return {
        ...state,
        texts: newTexts
      }
    case 'UPDATE_FONTSIZE':
      return {
        ...state,
        fontSize: action.fontSize
      }
    default:
      return state;
  }
}

export default formReducer;