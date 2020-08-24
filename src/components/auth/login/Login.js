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
      return alert('Something is wrong');
    }

    saveInfo(userInfo);

    store.setUserName(userInfo.name);

    store.login();

    history.push('/');
  };

  return (
    <div>
      <Form values={values} setValues={setValues} submit={submit} />
    </div>
  );
}
