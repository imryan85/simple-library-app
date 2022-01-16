import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import useAuth from './hooks/useAuth'
import UserContext from "./UserContext";
import Layout from './Layout';
import Routes from "./routes";

const App = () => { 
  const [authUser, setAuthUser] = useState(undefined);
  const { token, deleteToken } = useAuth();

  console.log('authUser', authUser)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`/user/${token}`);
        setAuthUser(res.data);
      } catch (e) {
        if (e?.response?.data?.message === "jwt expired") {
          deleteToken();
          window.location.reload();
        };
      }
    }
    if (token) {   
      getUserData();   
    }
  }, [deleteToken, token])

  return (
    <UserContext.Provider value={{ authUser, setAuthUser }}>
      <Router>
        <Layout maxWidth="md">  
          <Routes />  
        </Layout>  
      </Router>
    </UserContext.Provider>
  );
}

export default App;
