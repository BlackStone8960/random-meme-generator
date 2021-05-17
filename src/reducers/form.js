import defaultForm from '../form/defaultForm';

const formReducer = (state = defaultForm, action) => {
  switch (action.type) {
    case 'SET_FORM': 
      return {
        texts: action.texts,
        fontSize: action.fontSize,
        positions: action.positions
      };
    case 'UPDATE_TEXT':
      const newTexts = [...state.texts];
      newTexts[action.index] = action.text;
      return {
        ...state,
        texts: newTexts
      };
    case 'UPDATE_FONTSIZE':
      return {
        ...state,
        fontSize: action.fontSize
      };
    case 'UPDATE_POSITION':
      const newPositions = [...state.positions];
      newPositions[action.index] = action.position;
      return {
        ...state,
        positions: newPositions
      };
    default:
      return state;
  }
}

export default formReducer;