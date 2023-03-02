import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./navbar.css";
import Cookies from "js-cookie";

const Navbar = ()=>{
    const location = useLocation();
    const navigate = useNavigate();

    //Handlers
    const handleLogout = ()=>{
        Cookies.remove("token");
        navigate("/");
    }

    return(
        <section className="section-navbar">
            <nav className="test-container">
                <div className="route-container">
                    <Link to="/">Home</Link>
                    <p>{location.pathname}</p>
                </div>

                <div className="logout-btn-container">
                    <p onClick={()=> handleLogout()}>LOGOUT</p>
                </div>

            </nav>
        </section>
    )
}

export default Navbar;