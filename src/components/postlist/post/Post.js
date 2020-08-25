import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../../store/postsContext';
import { getUserId } from '../../../utils/localStorage';
import Like from './like/Like';

const Container = styled.div`
  display: gird;

  margin: 2em auto;
  height: auto;
  min-height: 170px;
  box-shadow: 2px 4px 9px 3px #d9d9d9;
  border-radius: 5px;
  padding: 1.5em 3em;
`;

const Img = styled.img`
  border-radius: 50px;
  margin-right: 15px;
  margin-top: 11px;
`;

export default function ({ post }) {
  const store = useStore();
  const {content, create_date, likes, _id, user } = post;
  console.log('Post')
  const updatePost = async () => {
    if (getUserId() !== user._id) {
      return;
    }
    await store.getPost(_id);
    store.toggleModal();
  };

  const toggleLike = async () => {

    await store.toggleLike(_id, getUserId());
  };

  return (
    <Container>
      <div className='flex row between mt-1'>
        <div className='flex row'>
          <Img src={user.image} alt='profilePic' height='50' width='50'></Img>
          <div>
            <p className='mb-1'>{user.name}</p>
            <span className='date'>{create_date}</span>
          </div>
        </div>
        {getUserId() === user._id && (
          <div className='flex row'>
            <i className='far fa-edit pointer' onClick={updatePost}></i>
            <i
              className='far fa-trash-alt ml-1 pointer'
              onClick={() => store.deletePost(_id)}></i>
          </div>
        )}
      </div>

      <p className='mt-4'>{content}</p>
      <Like likes={likes} toggleLike={toggleLike} />
    </Container>
  );
}
