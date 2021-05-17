// import React from 'react';

// const TextInput = ({ text, index }) => {
//   const onSetPosition = (e, index) => {
//     e.preventDefault();
//     setDirection(`Click the position to insert Text ${index + 1}.`);

//     const handleMouseClick = (e) => {
//       dispatchForm({
//         type: 'UPDATE_POSITION',
//         position: { x: e.pageX, y: e.pageY },
//         index
//       });
//       setDirection('');
//       document.getElementById('canvas').removeEventListener('click', handleMouseClick);
//     };
//     document.getElementById('canvas').addEventListener('click', handleMouseClick);
//   };


//   return (
//     <div key={index} className="form-row">
//       <label>Text {index + 1}</label>
//       <input
//         value={text}
//         onChange={(e) => dispatchForm({
//           type: 'UPDATE_TEXT',
//           text: e.target.value,
//           index
//         })}
//       ></input>
//       <button onClick={(e) => onSetPosition(e, index)} className="button">
//         Set position
//       </button>
//     </div>
//   )
// };

// export default TextInput;