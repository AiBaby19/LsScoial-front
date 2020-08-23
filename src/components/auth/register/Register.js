import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../forms/Form';
import { register } from '../../../api/auth';
import { saveToken } from '../../../utils/localStorage';

export default function () {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const history = useHistory();

  const submit = async () => {
    if (!values.name || !values.email || !values.password) {
      return alert('please fill all fields');
    }

    const userInfo = await register(values);
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
