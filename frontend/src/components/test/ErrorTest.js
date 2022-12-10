import React from "react";
import { Link } from "react-router-dom";




const ErrorTest = ({msg})=>{
    return(
        <section className="section-error-page">
            <div className="error-page-container">
                <img className="error-bg-img" src="/images/er-bg.png" alt="error-robot"></img>
                <h1 className="error-oops">Oops!</h1>
                <h3 className="error-msg">{msg}</h3>
                <p>HELPFUL LINKS.</p>
                <Link className="nav-link" to="/dashboard">Homepage</Link>
            </div>
        </section>
    )
};

export default ErrorTest;