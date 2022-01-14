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
  const { token } = useAuth();

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(`/user/${token}`);
      setAuthUser(res.data);
    }
    if (token) {   
      getUserData();   
    }
  }, [])

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
