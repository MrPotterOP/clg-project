import React,{useEffect, useState, useRef} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";


const RegisterStudent = ()=>{

    const url = "http://localhost:4000/api/institutes";
    const registerUrl = "http://localhost:4000/api/register";
    const [data, setData] = useState();
    const [isActive, setIsActive] = useState(false);
    const [institute, setInstitute] = useState({
        name: "Choose Institute.",
        id: null
    });

    const navigate = useNavigate();
    
    
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);


    useEffect(()=>{
        axios.get(url)
        .then(res => res.data.data ? setData(res.data.data) : null)
        .catch(err => err.response ? alert.apply("Something Went Wrong. Try Again Later.") : null);
    }, []);

    //Handlers
    const handleList = (e)=>{
        setInstitute({id: e.id, name: e.innerText});
        setIsActive(false);
    }

    const handleErr = (e)=>{
        alert(e);
    }
    const handleSuccess = (e)=>{
        const token = e.data.token;
        Cookies.set("token", token, {expires: 2});
        navigate("/dashboard");
    }

    const handleSubmit = ()=>{
        if(!institute.id || !name.current.value || !email.current.value || !email.current.value){
            alert("Fill all the fields correctly before submit.");
        }else{
            axios.post(registerUrl, {name: name.current.value, email: email.current.value, password: password.current.value, institute: institute.name})
            .then(e =>  (e.status===200) ? handleSuccess(e) : null)
            .catch(e => e.response ? handleErr(e.response.data.msg) : null);
        }
    }

    

    

    //Components
    const DroupDown = ()=>{
        return (<>
                <h2 className={isActive ? "dropdown-btn-active dropdown-btn" : "dropdown-btn"} onClick={()=> setIsActive(!isActive)}>{institute.name}</h2>
                <ul id={isActive ? "active-ul" : ""}>
                    {data.map((item) => (
                            <li key={item._id} id={item._id} onClick={(e)=> handleList(e.target)}>{item.name}</li>
                     ))}
                </ul>
        </>)
    }
    const Form = ()=>{
        return (
            <div className="register-container">
            <div className="register-image-container">
                <img src="/images/student-bg.jpg" alt="book"></img>
                <h1>Virtuous knowledge is that through which we perceive unity in diversity and sense the Brahma (i.e., God or Parmeshwar) in all the creatures on this earth.</h1>
            </div>

            <div className="register-form-container">
                <h1>Create an Account as a <span>Student</span>.</h1>
                <p>Join the community as a student to take a part in mcq test organized by your institute/university.</p>

                <div className="register-form">

                    <DroupDown /> 
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
        {data ? <Form /> : <h1>Loading</h1>}
    </>)
}

export default RegisterStudent;