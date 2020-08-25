import React from 'react';
import PostList from '../postlist/PostList';
import { useStore } from '../../store/postsContext';
import styled from 'styled-components';

const Container = styled.div`
  display: gird;
  width: 100%;
  margin: 0 auto;
  height: auto;
  min-height: 200px;
`;

const InputBtn = styled.button`
  width: 100%;
  border-radius: 15px;
  height: 30px;
  border: 1px solid lightgrey;
  text-align: left;
  cursor: pointer;
  margin: 2em auto;
`;

export default function () {
  const store = useStore();
  console.log('HOME')

  return (
    <Container>
      <InputBtn onClick={store.toggleModal}>
        Whats on your mind...?
      </InputBtn>
      <PostList />
    </Container>
  );
}
