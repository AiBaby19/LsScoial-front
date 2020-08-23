import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../forms/Form';
import { login } from '../../../api/auth';
import { saveToken } from '../../../utils/localStorage';

export default function () {
  const [values, setValues] = useState({ email: '', password: '' });
  const history = useHistory();

  const submit = async () => {
    if (!values.email || !values.password) {
      return alert('please fill all fields');
    }

    const userInfo = await login(values);
    if(!userInfo?.token) {
        return alert('Something is wrong')
    }
  
    saveToken(userInfo);

    history.push('/');
  };

  return (
    <div>
      <Form values={values} setValues={setValues} submit={submit} />
    </div>
  );
}
