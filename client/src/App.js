import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Layout from './Layout';
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
