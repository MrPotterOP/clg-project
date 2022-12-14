import React,{useEffect, useState} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

import "./test.css";


import ErrorTest from "./ErrorTest";
import TestPage from "./TestPage";
import Loading from "../loading/Loading";

const Test = ()=>{
    const [querry] = useSearchParams();
    const [id] = useState(querry.get("id"));
    
    const url = "http://localhost:4000/api/test";
    const token = Cookies.get("token");
    const [data, setData] = useState();

    
    useEffect(()=>{
        //handlers

        const handleSuccess = (d)=>{
            setData({status: "success", ...d, testId: id});
        }

        const handleError = (d)=>{
            setData({status: "error", msg: d.msg});
        }

        const fetchTest = ()=>{
            axios.patch(url, {testID: id}, {headers:{authorization: token}})
            .then(r => (r.status === 200) ? handleSuccess(r.data) : null)
            .catch(e => e.response.data ? handleError(e.response.data) : null)
        }

        //Main JS
        if(!id){
            setData({status:  "error", msg: "Invalid Test Link"});
        }else{
            fetchTest();
        }
    }, [id, token]);

    //Components
    const ConditionalRender = ()=>{
        if(data.status === "error"){
            return(<ErrorTest msg={data.msg}/>)
        }else{
            return(<TestPage data={data}/>)
        }
    }


    return (<>
        {data ? <ConditionalRender /> : <Loading />}
    </>
    )
};

export default Test;