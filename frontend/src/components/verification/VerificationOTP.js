import axios from "axios";
import React,{useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

import "./verificationotp.css";


const VerificationOTP = ()=>{
    
    const genOtpUrl = "http://localhost:4000/api/generateOTP";
    const verifyOtpUrl = "http://localhost:4000/api/verificationOTP";
    const [token] = useState(Cookies.get("token"));
    const [msg, setMsg] = useState("Generate OTP");
    const [isClose, setIsClose] = useState(false);
    const otp = useRef(null);

    const Navigate = useNavigate();

    //Handlers
    const handleGenOtp = ()=>{
        axios.post(genOtpUrl, {},{headers:{
            "Authorization": token
        }}).then(e => (e.status === 200) ? setMsg("OTP Sent.") : null)
        .catch(e => e.response ? setMsg(e.response.data.msg) : null);
        setIsClose(true);
    }
    
    const handleVerifyOtp = ()=>{
        if(!otp.current.value){
            alert("Type valid otp.");
        }else{
            axios.post(verifyOtpUrl, {otp: otp.current.value},{headers: {
                "Authorization": token
            }}).then(e => (e.status === 200) ? Navigate("/dashboard") : null)
            .catch(e => e.response ? alert(e.response.data.msg) : null);
        }
    }
    
    //Components

    const Form = ()=>{
        return(
            <div className="verification-form-container">
                <h1>Welcome to OTP Verification.</h1>
                <p>Here are the few steps, follow them to get verified successfully.</p>
                <div className="verification-form-steps-container">
                    <p><span>Step 1</span> Click on Generate OTP button to generate otp.</p>
                    <p><span>Step 2</span> After the button shows OTP sent then check your email spam, promotion and general folders and find OTP Verification mail there.</p>
                    <p><span>Step 3</span> Copy the OTP from the mail and paste it here and then click on Verify.</p>
                </div>

                <div className="verification-form">
                    <input ref={otp} type="text" placeholder="OTP"></input>
                    <div className="verification-form-btn-container">
                        <button disabled={isClose} onClick={handleGenOtp} className="btn-login btn-generate-otp">{msg}</button>
                        <button onClick={handleVerifyOtp} className="btn-login btn-verify-otp">Verify</button>
                    </div>
                    
                </div>
                
            </div>
        )
    }

    

    return(<section className="verification-otp-section">
        <Form />
    </section>)
}

export default VerificationOTP;