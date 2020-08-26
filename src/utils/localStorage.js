export const saveInfo = ({ token, userId, userName }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('userName', userName);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const getUserName = () => {
  return localStorage.getItem('userName');
};

export const deleteUserLS = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
};
