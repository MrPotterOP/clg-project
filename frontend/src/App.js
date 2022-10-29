import React from "react";
import {BrowserRouter ,Routes, Route} from "react-router-dom";

//Components
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/signUpIn/SignIn";
import SignUpIN from "./components/signUpIn/SignUpIn";
import Login from "./components/signUpIn/Login";


const App = ()=>{
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUpIN />} exact></Route>
            <Route path="/register" element={<SignIn />} exact></Route>
            <Route path="/login" element={<Login />} exact></Route>
            <Route path="/dashboard" element={<Dashboard />} exact></Route>
        </Routes>
    </BrowserRouter>
};

export default App;