import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import useAuth from './hooks/useAuth';
import Layout from './Layout';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Search from './components/Search';
import Routes from "./routes";

const App = () => { 

  return (
    <Layout maxWidth="md">  
      <Router>
        <Routes />    
      </Router>
    </Layout>
  );
}

export default App;
