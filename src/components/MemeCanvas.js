import React, { useEffect } from 'react';

const MemeCanvas = ({ meme, formInfo }) => {
  useEffect(() => {
    if (meme && formInfo) {
      const imgObj = new Image();
      imgObj.src =  meme.url;

      const canvasElem = document.getElementById('canvas');
      const ctx = canvasElem.getContext('2d');
      
      // const downloadBtn = document.getElementById('download');

      ctx.clearRect(0, 0, meme.width, meme.height);

      const fixRate = meme.width > 500 ? meme.width / 500 : 1;
      const fixedFont = formInfo.fontSize * fixRate;
      ctx.font = `${fixedFont}px Impact`;
      ctx.shadowColor = 'black';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'white';

      const canvasPosition = canvasElem.getBoundingClientRect();
      const canvasPositionX = window.pageXOffset + canvasPosition.left;
      const canvasPositionY = window.pageYOffset + canvasPosition.top;

      imgObj.onload = () => {
        ctx.drawImage(imgObj, 0, 0);
        formInfo.texts.forEach((text, index) => {
          const textX = (formInfo.positions[index].x - canvasPositionX) * fixRate;
          const textY = (formInfo.positions[index].y - canvasPositionY + formInfo.fontSize) * fixRate;
          ctx.shadowBlur = 6;
          ctx.strokeText(text, textX, textY);
          ctx.shadowBlur = 0;
          ctx.fillText(text, textX, textY);  

          // downloadBtn.addEventListener('click', () => {
          //   downloadBtn.href = canvasElem.toDataURL('image/jpeg');
          // })
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
      {/* Implement download button */}
      {/* <a id="download" href="#" download="random-meme.jpg">DOWNLOAD MEME</a> */}
    </div>
  )
};

export default MemeCanvas;