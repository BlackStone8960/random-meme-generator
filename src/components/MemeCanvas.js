import React, { useEffect } from 'react';

const MemeCanvas = ({ meme, formInfo }) => {
  useEffect(() => {
    if (meme && formInfo) {
      const imgObj = new Image();
      imgObj.src =  meme.url;

      const canvasElem = document.getElementById('canvas');
      const ctx = canvasElem.getContext('2d');

      ctx.clearRect(0, 0, meme.width, meme.height);
      ctx.font = `${formInfo.fontSize}px Impact`;
      ctx.shadowColor = 'black';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'white';

      imgObj.onload = () => {
        ctx.drawImage(imgObj, 0, 0);
        formInfo.texts.forEach((text, index) => {
          const textWidth = ctx.measureText(text).width;
          const textX = (meme.width - textWidth) / 2;
          const textY = (index + 1) * meme.height / 2;
          ctx.shadowBlur = 6;
          ctx.strokeText(text, textX, textY);
          ctx.shadowBlur = 0;
          ctx.fillText(text, textX, textY);  
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