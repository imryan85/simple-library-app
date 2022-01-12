/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Routes as ReactRoutes, 
  Route,
  useNavigate,
} from "react-router-dom";
import useAuth from './hooks/useAuth';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Search from './components/Search';

const Routes = () => { 
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!token) {
      navigate("/signin");
    }
  }, [token])

  return (    
    <ReactRoutes>
      <Route path="/" element={<Search />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </ReactRoutes>  
  );
}

export default Routes;
