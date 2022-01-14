import { useState, useContext } from 'react';
import UserContext from '../UserContext';

const useAuth = () => {  
  const { setAuthUser } = useContext(UserContext);

  const getToken = () => {
    const accessToken = localStorage.getItem('token');
    return accessToken
  };

  const [token, setToken] = useState(getToken());
  
  const saveToken = (accessToken, user) => {
    localStorage.setItem('token', accessToken);
    setToken(accessToken);
    setAuthUser(user);
  };

  const deleteToken = () => {
    localStorage.removeItem('token');
    setToken(undefined);
    setAuthUser(undefined);
  };

  return {
    token,
    deleteToken,
    setToken: saveToken,
  };
}

export default useAuth;