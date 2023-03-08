import React from 'react';
import "./ImageLinkForm.css";

function ImageLinkForm({ onInputChange, onPictureSubmit }) {
  return (
    <div>
      <p className='f3'>This Smart Brain will detect faces in your picture. Give it a try!</p>
      <div className='form pa4 br3 shadow-5'>
        <input 
          type="text" 
          className='w-70 f4 pa2 bn' 
          onChange={onInputChange}
        />
        <button 
          className='w-30 f4 link ph3 pv2 dib white bg-light-purple bn pointer' 
          type='submit'
          onClick={onPictureSubmit}
        >Detect</button>
      </div>
    </div>
  )
}

export default ImageLinkForm