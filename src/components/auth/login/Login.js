import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../forms/Form';
import { login } from '../../../api/auth';
import { saveInfo } from '../../../utils/localStorage';
import { useStore } from '../../../store/postsContext';

export default function () {
  // use store with optional 'name' for register
  const [values, setValues] = useState({ email: '', password: '' });
  const history = useHistory();
  const store = useStore();

  const submit = async () => {
    if (!values.email || !values.password) {
      return alert('please fill all fields');
    }

    const userInfo = await login(values);
    if (!userInfo?.token) {
      return alert(userInfo.message);
    }

    saveInfo(userInfo);
    store.login();
  };

  return (
    <div>
      <p className='text-center'>Login</p>
      <Form values={values} setValues={setValues} submit={submit} />
    </div>
  );
}
