import React, { useState, useEffect } from 'react';
import { toJS } from 'mobx';
import styled from 'styled-components';
import { useStore } from '../../store/postsContext';
import { getUserId } from '../../utils/localStorage';

const BackGround = styled.div`
  position: fixed;
  height: 100% !important;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;
const ModalWrapper = styled.div`
  display: gird;
  margin: 7em auto;
  min-height: 60%;
  height: auto;
  width: 80%;
  border-radius: 5px;
  background-color: white;
`;
const ExitModal = styled.p`
  text-align: right;
  margin: 0;
  padding: 5px;
  color: red;
`;
const Content = styled.textarea`
  font-size: 20px;
  border: none;
  width 90%;
  margin: 0 auto;
  min-height: 18em;
  height: auto;
  overflow: auto;
  resize: none;
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
`;

export default function () {
  const [content, setContent] = useState('');
  const store = useStore();

  useEffect(() => {
    if (store.post) {
      setContent(toJS(store.post.content));
    }
  }, []);

  useEffect(() => {
    return () => {console.log('')};
  }, []);

  const submitPost = () => {
    store.post ? updatePost() : addNewPost();
    store.toggleModal();
  };

  const updatePost = () => {
    const post = {
      ...store.post,
      content
    };
   
    store.updatePost(post);
    store.initModalPost();
  };

  const addNewPost = () => {
    const post = {
      user: getUserId(),
      content,
      create_date: new Date(),
      edit_date: null,
    };
    store.addPost(post);
  };

  const closeModal = () => {
    if (store.post) {
      store.initModalPost();
    }
    store.toggleModal();
  };

  return (
    <BackGround>
      <ModalWrapper>
        <ExitModal onClick={closeModal}>
          {' '}
          <i className='fas fa-times pointer'></i>
        </ExitModal>
        <div className='text-center'>
          <span>Create Post</span>
        </div>
        <hr />
        <div className='text-center'>
          <Content
            role='textbox'
            contenteditable
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button onClick={submitPost}>Post</Button>
      </ModalWrapper>
    </BackGround>
  );
}
