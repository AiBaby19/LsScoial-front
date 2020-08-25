import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 2em auto;
  width: 20em;
  height: auto;
`;
const Input = styled.input`
  height: 2em;
  border: none;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 3em;
`;
const Button = styled.button`
  width: 100%;
  height: 2em;
  cursor: pointer;
  border-radius: 5px;
  background-color: #388e8e;
  color: white;
  font-size: 18px;
  margin-top: 0.5em;
`;

export default function ({ setValues, values, submit }) {
  const handleChanges = (e, vKey) => {
    const value = vKey === 'image' ? e.target.files[0] : e.target.value;
    setValues({ ...values, [vKey]: value });
  };

  const renderInput = () => {
    return Object.keys(values).map((vKey) => {
      return (
        <Input
          key={vKey}
          type={vKey === 'image' ? 'file' : vKey === 'email' ? 'email' : 'text' }
          placeholder={vKey.toUpperCase()}
          onChange={(e) => handleChanges(e, vKey)}
        />
      );
    });
  };
  return (
    <Container>
      {renderInput()}
      <Button onClick={submit}>Send</Button>
    </Container>
  );
}
