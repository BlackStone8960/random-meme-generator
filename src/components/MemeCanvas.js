import React, { useEffect } from 'react';

const MemeCanvas = ({ meme, formInfo }) => {
  useEffect(() => {
    if (meme && formInfo) {
      const canvasElem = document.getElementById('canvas');
      const ctx = canvasElem.getContext('2d');
      
      ctx.clearRect(0, 0, meme.width, meme.height);
      const imgObj = new Image();
      imgObj.src =  meme.url;
      ctx.font = `${formInfo.fontSize}px Arial`;
      ctx.fillStyle = '#000000';
      imgObj.onload = () => {
        ctx.drawImage(imgObj, 0, 0);
        formInfo.texts.forEach((text, index) => {
          ctx.fillText(`${text}`, (index + 1) * meme.width / 6, (index + 1) * meme.height / 6);  
        })
      };  
    }
  }, [meme, formInfo]);

  return (
    <div>
      <canvas
        width={meme ? meme.width : 500}
        height={meme ? meme.height : 500}
        id="canvas"
      >
      </canvas>
    </div>
  )
};

export default MemeCanvas;