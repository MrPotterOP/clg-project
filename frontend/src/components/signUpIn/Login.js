import React,{useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ()=>{
    
    const url = "http://localhost:4000/api/login";
    const Navigate = useNavigate();
    const email = useRef(null);
    const password = useRef(null);

    //Handlers


    const handleSuccess = (e)=>{
        Cookies.set("token", e.token, {expires: 2});
        Navigate("/dashboard");
    }

    const handleError =(e)=>{
        alert(e);
    }

    const handleSubmit = ()=>{
        if(!email.current.value || !password.current.value){
            alert("Fill all the info correctly.");
        }else{
            axios.post(url, {email: email.current.value, password: password.current.value})
            .then(e => (e.status === 200) ? handleSuccess(e.data) : null)
            .catch(e => (e.response) ? handleError(e.response.data.msg) : null);
        }
    };



    //Components
    const Form = ()=>{
        return (
            <div className="register-container">
            <div className="register-image-container">
                <img src="/images/default-bg.jpg" alt="book"></img>
                <h1>Be fearless, Soul is neither born nor does it ever die</h1>
            </div>

            <div className="register-form-container">
                <h1>Login</h1>
                <p>Enter your email and password below.</p>

                <div className="register-form">
                    <input ref={email} id="input-email"  placeholder="Email" type="email"></input>
                    <input  ref={password} id="input-password" placeholder="Password" type="password"></input>

                    <button onClick={handleSubmit} className="btn-primary">Login</button>
                    <p>Dont have an account? <Link to="/">Create One.</Link></p>
                </div>
            </div>
        </div>
        )
    }



    return (
        <section className="section-register">
            <Form />
        </section>
    )
};

export default Login;