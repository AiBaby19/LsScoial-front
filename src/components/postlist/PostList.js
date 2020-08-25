import React, { useEffect, useState, memo } from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

import { useStore } from '../../store/postsContext';
import Post from './post/Post';

export default function () {
  const [skip, setSkip] = useState(0);
  const store = useStore();
  console.log('PostList')

  useEffect(() => {
    store.getTenPosts(skip);
  }, [skip]);

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target.body;
    if (offsetHeight + scrollTop === scrollHeight) {
      setSkip(store.posts.length);
    }
  };
  window.addEventListener('scroll', handleScroll);

  return useObserver(() => {
    const posts = toJS(store.posts);

    return (
      <div className='post-list'>
        {store.posts.length > 0 ?
          posts.map((post, i) => <Post key={post._id} post={post} />)
        :
        <p>0 Posts Published...</p>}
      </div>
    );
  });
}
