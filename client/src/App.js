import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashBoard from "./Pages/AdminDashBoard";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>  
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
        
      </Routes>
    </Router>
    </Provider>
    
  );
}

export default App;
