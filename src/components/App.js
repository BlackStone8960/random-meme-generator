import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import memesReducer from '../reducers/memes';
import EditForm from './EditForm';
import MemeCanvas from './MemeCanvas';

const initialState = {
  data: [],
  error: ''
}

const initialFormInfo = {
  texts: [''],
  fontSize: 20
}

const App = () => {
  const [memes, memesDispatch] = useReducer(memesReducer, initialState);
  const [meme, setMeme] = useState({});
  const [formInfo, setFormInfo] = useState(initialFormInfo);
  
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
      const randomIndex = Math.floor(Math.random() * memes.data.length); // 文章を載せる場所をmeme毎に設定するために枚数を制限するなどした方がいいかもしれない
      setMeme(memes.data[randomIndex]);      
    }
  }, [memes])

  const onSubmit = (info) => {
    // Make image using canvas?
    setFormInfo(info);
  };
  
  return (
    <div>
      <EditForm onSubmit={onSubmit} meme={meme}/>
      <MemeCanvas meme={meme} formInfo={formInfo} />
    </div>
  );
}

export default App;
