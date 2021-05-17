import React, { useState, useReducer, useEffect } from 'react';
import formReducer from '../reducers/form';
import defaultForm from '../form/defaultForm';

const EditForm = (props) => {
  const [form, dispatchForm] = useReducer(formReducer, defaultForm);
  const [direction, setDirection] = useState('');

  useEffect(() => {
    if (props.meme) {
      dispatchForm({
        type: 'SET_FORM',
        texts: Array(props.meme.box_count).fill(''),
        fontSize: defaultForm.fontSize,
        positions: Array(props.meme.box_count).fill({ x: 0, y: 0 })
      });  
    }
  }, [props.meme]);
  
  const onSubmit = (e) => {
    console.log(defaultForm);
    e.preventDefault();
    if(form.texts && form.positions) {
      props.onSubmit(form);
    } else if (!form.texts){
      setDirection('Input all inputs');
    } else if (!form.positions) {
      setDirection('Set position of every texts');
    } else {
      setDirection('Input all information');
    }
  }

  const onSetPosition = (e, index) => {
    e.preventDefault();
    setDirection(`Click the position to insert Text ${index + 1}.`);

    const handleMouseClick = (e) => {
      dispatchForm({
        type: 'UPDATE_POSITION',
        position: { x: e.pageX, y: e.pageY },
        index
      });
      setDirection('');
      document.getElementById('canvas').removeEventListener('click', handleMouseClick);
    };
    document.getElementById('canvas').addEventListener('click', handleMouseClick);
  };

  return (
    <form className="edit-form">
      { 
        form.texts && form.texts.map((text, index) => (
          <div key={index} className="form-row">
            <label>Text {index + 1}</label>
            <input
              value={text}
              onChange={(e) => dispatchForm({
                type: 'UPDATE_TEXT',
                text: e.target.value,
                index
              })}
            ></input>
            <button onClick={(e) => onSetPosition(e, index)} className="button">
              Set position
            </button>
            {/* {form && <span>{form.positions[index].x}, {form.positions[index].y}</span>} */}
          </div>
        ))
      }
      <div className="form-row" id="form-row-fontsize">
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
      <button onClick={onSubmit} className="button go">GO!!</button>
      <div className="form-direction">{direction}</div>
    </form>
  )
};

export default EditForm;