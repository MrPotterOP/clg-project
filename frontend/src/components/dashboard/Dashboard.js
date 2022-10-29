import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Dashboard = ()=>{

    const Navigate = useNavigate();

    useEffect(()=>{
       const token =  Cookies.get("token");
       if(!token){
        Navigate("/");
       }else{
        console.log(token);
       }
    }, [Navigate]);
    return <h1>Dashboard.</h1>
}

export default Dashboard;