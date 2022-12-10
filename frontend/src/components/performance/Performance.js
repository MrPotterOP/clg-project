import React,{useEffect, useState} from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

import ErrorTest from "../test/ErrorTest";
import Hero from "../dashboard/Hero";

import "./performance.css";


const Performance = ()=>{

    const [querry] = useSearchParams();
    const [id] = useState(querry.get("id"));
    
    const url = "http://localhost:4000/api/performance";
    const token = Cookies.get("token");
    const [data, setData] = useState();


    //Handlers

    const mapStudentCards = (i) =>{
        return(<StudentCard name={i.name} right={i.score.right} wrong={i.score.wrong} score={i.score.right - i.score.wrong} />);
    }

    //Comoponents

    const StudentCard = ({name, right, wrong, score})=>{
        return(<div className="student-performance-container">
                    <p className="student-name">{name}</p>
                    <div className="student-score-container">
                        <p className="student-score-card">Score: {score}</p>
                        <p className="student-score-card">Right: {right}</p>
                        <p className="student-score-card">Wrong: {wrong}</p>
                    </div>
        </div>)
    }

    const ShowData = ()=>{
        return(<>
            <Hero img={"bg-3"} />

            <section className="section-submission">
                <div className="submissions-score-container">
                    <Link className="nav-link" to="/dashboard">go back to HOME</Link>
                    <h1>Performance</h1>
                </div>
                <p>{data.data.length} students have submitted the test.</p>
                <div className="performance-container">
                    {(data.data.length === 0) ? null : data.data.map(i => mapStudentCards(i))}
                </div>
            </section>

        </>);
    }

    const ConditionalRender = ()=>{
        if(data.status === "error"){
            return(<ErrorTest msg={data.msg}/>)
        }else{
            return(<ShowData />)
        }
    }

    //Main JS

    useEffect(()=>{
        //handlers

        const handleSuccess = (d)=>{
            setData({status: "success", ...d, testId: id});
        }

        const handleError = (d)=>{
            setData({status: "error", msg: d.msg});
        }

        const fetchPerformance = ()=>{
            axios.patch(url, {testId: id}, {headers:{authorization: token}})
            .then(r => (r.status === 200) ? handleSuccess(r.data) : null)
            .catch(e => e.response.data ? handleError(e.response.data) : null)
        }

        //Main JS
        if(!id){
            setData({status:  "error", msg: "Invalid Performance Link"});
        }else{
            fetchPerformance();
        }
    }, [id, token]);

    return(<>
        {data ? <ConditionalRender /> : <h1>Loading</h1>}
    </>)
};

export default Performance;