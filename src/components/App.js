import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import memesReducer from '../reducers/memes';
import EditForm from './EditForm';
import MemeCanvas from './MemeCanvas';
import defaultForm from '../form/defaultForm';

const initialState = {
  data: [],
  error: ''
}

const App = () => {
  const [memes, memesDispatch] = useReducer(memesReducer, initialState);
  const [meme, setMeme] = useState({});
  const [formInfo, setFormInfo] = useState(defaultForm);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const memeData = await axios('https://api.imgflip.com/get_memes');
        memesDispatch({
          type: 'FETCH_SUCCESS',
          data: memeData.data.data.memes
        })
        console.log(memeData);  
      } 
      catch (err) {
        memesDispatch({
          type: 'FETCH_ERROR',
          error: `Failed to fetching API : ${err}`
        });
      }
    };
    fetchData();
  }, [])

  useEffect(() => {
    if(memes) {
      const randomIndex = Math.floor(Math.random() * memes.data.length);
      setMeme(memes.data[randomIndex]);      
    }
  }, [memes])

  const onSubmit = (info) => {
    setFormInfo(info);
  };
  
  return (
    <div className="generator-wrapper">
      <h1>Random Meme Generator</h1>
      <EditForm meme={meme} onSubmit={onSubmit}/>
      <MemeCanvas meme={meme} formInfo={formInfo} />
    </div>
  );
}

export default App;
