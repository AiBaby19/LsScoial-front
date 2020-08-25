export const saveInfo = ({ token, userId, userName }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const deleteUserLS = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};
