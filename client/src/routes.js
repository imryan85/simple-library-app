/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Routes as ReactRoutes, 
  Route,
  useNavigate,
} from "react-router-dom";
import useAuth from './hooks/useAuth';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Search from './pages/Search';
import Cart from './pages/Cart'
import BooksLended from "./pages/BooksLended";
import Browse from "./pages/Browse";

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
      <Route path="/browse" element={<Browse />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/bookslended" element={<BooksLended />} />
    </ReactRoutes>  
  );
}

export default Routes;
