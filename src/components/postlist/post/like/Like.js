import React from 'react';

export default function ({ likes, toggleLike }) {
  return (
    <div>
      <i className='fas fa-thumbs-up pointer' onClick={toggleLike}></i>
      <span className='ml-1'>{likes}</span>
    </div>
  );
}
