import React from "react";
import {BrowserRouter ,Routes, Route} from "react-router-dom";

//Components
import Dashboard from "./components/dashboard/Dashboard";
import SignUpIN from "./components/signUpIn/SignUpIn";


const App = ()=>{
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUpIN />} exact></Route>
            <Route path="/dashboard" element={<Dashboard />} exact></Route>
        </Routes>
    </BrowserRouter>
};

export default App;