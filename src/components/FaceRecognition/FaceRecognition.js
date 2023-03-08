import React from 'react'
import "./FaceRecognition.css";

function FaceRecognition({imageUrl, box}) {
  return (
    imageUrl && (
      <div className='center ma'>
        <div className="absolute mt4" >
          <img 
            id='inputImage' 
            src={imageUrl} 
            alt="img" 
            width="500px" 
            height="auto" 
            // style={{objectFit: "contain"}}
          />
          <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
      </div>
    )
  )
}

export default FaceRecognition