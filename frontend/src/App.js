import React from "react";
import {BrowserRouter ,Routes, Route} from "react-router-dom";

//Components
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/signUpIn/SignIn";
import SignUpIN from "./components/signUpIn/SignUpIn";
import Login from "./components/signUpIn/Login";
import VerificationOTP from "./components/verification/VerificationOTP";
import Test from "./components/test/Test";
import Submission from "./components/submission/Submission";
import Performance from "./components/performance/Performance";


const App = ()=>{
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUpIN />} exact></Route>
            <Route path="/register" element={<SignIn />} exact></Route>
            <Route path="/login" element={<Login />} exact></Route>
            <Route path="/dashboard" element={<Dashboard />} exact></Route>
            <Route path="/otpverification" element={<VerificationOTP />} exact></Route>
            <Route path="/test" element={<Test />} exact></Route>
            <Route path="/submission" element={<Submission />} exact></Route>
            <Route path="/performance" element={<Performance />} exact></Route>
            
        </Routes>
    </BrowserRouter>
};

export default App;