import API_URI from './apiUri';
import { getToken } from '../utils/localStorage';

const URL = `${API_URI}/posts`;

const tokenOption = () => {
  return { headers: { 'x-access-token': getToken() } };
};

export const getTenPosts = async () => {
  try {
    const res = await fetch(`${URL}`, tokenOption());
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const getOne = async (id) => {
  try {
    const res = await fetch(`${URL}/${id}`);
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const add = async (post) => {
  try {
    const res = await fetch(`${URL}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const update = async (post) => {
  try {
    const res = await fetch(`${URL}/${post._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(post),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const remove = async (id) => {
  try {
    const res = await fetch(`${URL}/${id}`, { method: 'delete' });
    return await res.json();
  } catch (err) {
    throw err;
  }
};
