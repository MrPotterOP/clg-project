import React,{useRef} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";


const RegisterInstitute = ()=>{

    const registerUrl = "http://localhost:4000/api/register";
    

    const navigate = useNavigate();
    
    
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);


    //Handlers
    
    const handleErr = (e)=>{
        alert(e);
    }
    const handleSuccess = (e)=>{
        const token = e.data.token;
        Cookies.set("token", token, {expires: 2});
        navigate("/dashboard");
    }

    const handleSubmit = ()=>{
        if( !name.current.value || !email.current.value || !email.current.value){
            alert("Fill all the fields correctly before submit.");
        }else{
            axios.post(registerUrl, {name: name.current.value, email: email.current.value, password: password.current.value, institute: "null"})
            .then(e =>  (e.status===200) ? handleSuccess(e) : null)
            .catch(e => e.response ? handleErr(e.response.data.msg) : null);
        }
    }

    

    

    //Components
    
    const Form = ()=>{
        return (
            <div className="register-container">
            <div className="register-image-container">
                <img src="/images/institute-bg.jpg" alt="book"></img>
                <h1>A great leader should break away from the selfish ego of I, me and mine.</h1>
            </div>

            <div className="register-form-container">
                <h1>Create an Account as an <span>Institute/University</span>.</h1>
                <p>Create an account as an institute to organize mcq tests.</p>

                <div className="register-form">

                     
                    <input id="input-name" ref={name} placeholder="Name" type="text"></input>

                    
                    
                    <input id="input-email" ref={email} placeholder="Email" type="email"></input>
                    <input id="input-password" ref={password} placeholder="Password" type="password"></input>

                    <button onClick={handleSubmit} className="btn-primary">Create Account.</button>
                    <p>Already have an account? <Link to="/login?account=student">LogIn.</Link></p>
                </div>
            </div>
        </div>
        )
    }


    return (<>
        {<Form />}
    </>)
}

export default RegisterInstitute;