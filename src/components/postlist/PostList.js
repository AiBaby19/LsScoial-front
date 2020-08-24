import React, { useContext, useEffect } from 'react';
import { useLocalStore, useObserver } from 'mobx-react';
import { toJS } from 'mobx';

import { useStore } from '../../store/postsContext';
import Post from './post/Post';

export default function () {
  const store = useStore();

  useEffect(() => {
    store.getTenPosts();
  }, []);
  console.log('load');

  return useObserver(() => {
    const posts = toJS(store.posts);

    return (
      <div>
        {store.posts.length > 0 &&
          posts.map((post, i) => <Post key={post._id} post={post} />)}
      </div>
    );
  });
}
