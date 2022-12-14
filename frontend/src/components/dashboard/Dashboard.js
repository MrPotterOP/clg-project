import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "./Dashboard.css";

//Components
import InstituteDashboard from "./InstituteDashboard";
import StudentDashboard from "./StudentDashboard";
import Loading from "../loading/Loading";

const Dashboard = ()=>{

    const url = "http://localhost:4000/api/dashboard";
    const Navigate = useNavigate();

    const [data, setData] = useState();

    useEffect(()=>{

        const token =  Cookies.get("token");
        const fetchDashboard = () =>{
            axios.get(url, {headers: {
                "Authorization": token
            }}).then(e => (e.status === 200) ? handleSuccess(e.data) : null)
            .catch(e => e.response ? handleError(e) : null)
        }
        //handlers

        const handleError = (e)=>{
            alert(e);
            Navigate("/otpverification");
        }
        const handleSuccess = (e)=>{
            setData(e);
        }
       
       if(!token){
        Navigate("/");
       }else{
        fetchDashboard(token);
       }
    }, [Navigate]);


    //handlers
    // const conditionalRender = ()=>{
    //     if(account === "INS"){
    //         return <InstituteDashboard />
    //     }else{
    //         return <StudentDashboard data={data}/>
    //     }
    // }

    //Components

    const RenderDashboard = ()=>{
        if(data.account === "null"){
            return <InstituteDashboard data={data}/>
        }else{
            return <StudentDashboard data={data}/>
        }
    }
    return (<section className="dashboard-section">
        {data ? <RenderDashboard /> : <Loading />}
    </section>)
}

export default Dashboard;