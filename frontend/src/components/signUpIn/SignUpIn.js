import React,{useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import Cookies from "js-cookie";

import "./signupin.css";



const SignUpIn = ()=>{

    const Navigate = useNavigate();
    
    useEffect(()=>{
        const token = Cookies.get("token");

        if(token){
            Navigate("/dashboard");
        }
    }, [Navigate]);

    //components

    const Container = (student) =>{
        return(
            <div className={student ? "signup-student-container" : "signup-institute-container"}>
                <img src={student ? "/images/student.png" : "/images/institute.png"} alt="student/institute"></img>
                <h1>{student ? "As a Student" : "As an Institute"}</h1>
                <p>{student ? "Join the Community as a student." : "Join the Community as an Institute."}</p>
                <Link to={student ? "/login?account=student" : "/login?account=institute"}><button className="btn-login">LogIn</button></Link>
                <p>Didn't Have an account, <Link className="link-register" to={student ? "/register?account=student" : "/register?account=institute"}>Register.</Link></p>
            </div>
        )
    }

    const Options = ()=>{
        return (
            <div className="signup-options-container">
                <h1>Login or Join Us</h1>
                <div className="signup-container">
                    {Container(true)}
                    {Container(false)}
                </div>
                
            </div>
        )
    }

    return (
        <section className="section-signupin">
            <div className="signupin-conatiner">
                <Options />
            </div>
        </section>
    )
}

export default SignUpIn;