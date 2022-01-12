import { useState } from 'react';

const useAuth = () => {
  const getToken = () => {
    const accessToken = localStorage.getItem('token');
    return accessToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = accessToken => {
    localStorage.setItem('token', accessToken);
    setToken(accessToken);
  };

  const deleteToken = accessToken => {
    localStorage.removeItem('token');
    setToken(undefined);
  };

  return {
    token,
    deleteToken,
    setToken: saveToken,
  };
}

export default useAuth;