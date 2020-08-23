export const saveToken = ({ token, userId }) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const deleteToken = () => {
  return localStorage.removeItem('token');
};
