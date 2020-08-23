import React, { useContext } from 'react';
import { useStore } from '../../store/postsContext';
import Post from './post/Post';

export default function () {
  const store = useStore();

  return (
    <div>
      {store.posts.map(({ title, content }, key) => {
        return <Post key={title} title={title} content={content} />;
      })}
    </div>
  );
}
