import React,{ useState} from "react";
import {useSearchParams} from "react-router-dom";

//components
import RegisterInstitute from "./RegisterInstitute";
import RegisterStudent from "./RegisterStudent";


const SignIn = ()=>{
    const [querry] = useSearchParams();
    const [account] = useState(querry.get("account"));



    return (
        <section className="section-register">
            {(account === "institute") ? <RegisterInstitute /> : <RegisterStudent />}
        </section>
    )
}

export default SignIn;