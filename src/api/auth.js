import API_URI from '../api/apiUri';

const URL = `${API_URI}/auth`;

export const register = async (data) => {
  try {
    const res = await fetch(`${URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const login = async (credentials) => {
  try {
    const res = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
};