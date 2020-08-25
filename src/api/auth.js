import API_URI from '../api/apiUri';

const URL = `${API_URI}/auth`;

export const register = async (data) => {
  try {
    const res = await fetch(`${URL}/register`, {
      method: 'POST',
      body: data,
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

export const connectAuto = async (token) => {
  try {
    const res = await fetch(`${URL}/is-loggedIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({token}),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
}
