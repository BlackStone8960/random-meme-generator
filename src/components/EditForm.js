import React, { useReducer, useEffect } from 'react';
import formReducer from '../reducers/form';

const initForm = {
  texts: [''],
  fontSize: 28
};

const EditForm = (props) => {
  const [form, dispatchForm] = useReducer(formReducer, initForm);

  useEffect(() => {
    if (props.meme) {
      dispatchForm({
        type: 'INIT_FORM',
        texts: Array(props.meme.box_count).fill(''),
        fontSize: 28
      });  
    }
  }, [props.meme]);
  
  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(form);
    dispatchForm({
      type: 'INIT_FORM',
      texts: Array(props.meme.box_count).fill(''),
      fontSize: form.fontSize
    });  
  }

  return (
    <form onSubmit={onSubmit}>
      { form.texts && form.texts.map((text, index) => (
        <div key={index}>
          <label>Text {index + 1}</label>
          <input
            value={text}
            onChange={(e) => dispatchForm({
              type: 'UPDATE_TEXT',
              text: e.target.value,
              index
            })}
          ></input>
        </div>
      )) }
      <div>
        <label>Font Size</label>
        <input
          value={form.fontSize}
          onChange={(e) => dispatchForm({
            type: 'UPDATE_FONTSIZE',
            fontSize: e.target.value
          })}
          type='number'
        ></input>
      </div>
      <button>GO!!</button>
    </form>
  )
};

export default EditForm;