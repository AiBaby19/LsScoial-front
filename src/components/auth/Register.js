import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../forms/Form';
import { register } from '../../api/auth';
import { saveInfo } from '../../utils/localStorage';
import { useStore } from '../../store/postsContext';

export default function (props) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    image: '',
  });
  const history = useHistory();
  const store = useStore();

  const submit = async () => {
    if (!values.email || !values.password || !values.name) {
      return alert('please fill all fields');
    }

    const fd = new FormData();
    Object.keys(values).forEach((key) => fd.append(key, values[key]));

    const userInfo = await register(fd);
    if (!userInfo?.token) {
      return alert(userInfo.message);
    }

    saveInfo(userInfo);
    store.login();
  };

  return (
    <div>
      <p className='text-center'>Register</p>
      <Form values={values} setValues={setValues} submit={submit} />
    </div>
  );
}
