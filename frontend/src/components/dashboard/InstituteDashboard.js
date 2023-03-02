import React,{useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Hero from "./Hero";
import Navbar from "../navbar/Navbar";




const InstituteDashboard = ({data})=>{
    const postUrl = "http://localhost:4000/api/createTest";

    //Data
    const {prevTest, upTest} = data;

    //Token
    const token = Cookies.get("token");

    const navigate = useNavigate();

    //Inputs
    const title = useRef("");
    const description = useRef("");
    const questions = useRef(0);
    const duration = useRef(0);
    const day = useRef(0);
    const month = useRef(0);
    const year = useRef(0);
    const hour = useRef(0);
    const min = useRef(0);

    const [difficulty, setDifficulty] = useState("Easy");


    //Handlers

    const handleError = (res) =>{
        alert(res.msg);
    };

    const handleSuccess = (res) =>{
        alert(res.msg);
        window.location.reload();
    }

    const createTest = ()=>{
        const dateString = `${day.current.value}/${month.current.value}/${year.current.value}`;
        const timeString = `${hour.current.value}/${min.current.value}`;

        const inputData = {
            name: title.current.value,
            description: description.current.value,
            duration: parseInt(duration.current.value),
            date: dateString,
            time: timeString,
            questions: parseInt(questions.current.value),
            level: difficulty
        }
        console.log(inputData);
        axios.post(postUrl, {...inputData}, {headers: {
            "Authorization": token
        }}).then(e => (e.status === 200) ? handleSuccess(e.data) : null)
        .catch(e => (e.response.data) ? handleError(e.response.data) : null);

    }

    const handleSubmit = ()=>{
        if(title.current.value === "" || description.current.value === "" || questions.current.value === 0 || duration.current.value === 0 || day.current.value === 0 || month.current.value === 0 || year.current.value === 0){
            alert("Fill All the fields properly to create new test.");
        }else{
            createTest();
        }
    }

    const handleRadioInput = (target) =>{
        setDifficulty(target.innerHTML);
    }


    //Components
    const ScheduleTest = ()=>{
        return(
            <section className="section-schedule-test">
                <div className="schedule-test-container test-container">
                    <h1>Schedule New Test</h1>
                    <div className="schedule-test">
                        <div className="schedule-test-left">
                            <div className="schedule-test-input-container">
                            <h3 className="input-title-h3">Test Title</h3>
                            <input ref={title} defaultValue={title.current.value} type="text" className="input-box-text" placeholder="e.g Januray Test"></input>
                            </div>
                            <div className="schedule-test-input-container">
                            <h3 className="input-title-h3">Test Description</h3>
                            <input ref={description} defaultValue={description.current.value} type="text" className="input-box-text" placeholder="e.g to test the thinking ability of students."></input>
                            <div className="test-left-sub-inputs-container">
                                <div className="schedule-test-small-input-box">
                                    <h3>Questions</h3>
                                    <input ref={questions} defaultValue={questions.current.value} className="input-box" type="number" placeholder="10"></input>
                                </div>
                                <div className="schedule-test-small-input-box">
                                    <h3>Difficulty</h3>
                                    <div className="difficulty-options-container">
                                        <p onClick={(e)=> handleRadioInput(e.target)} className={(difficulty === "Easy") ? "active" : ""} >Easy</p>
                                        <p onClick={(e)=> handleRadioInput(e.target)} className={(difficulty === "Medium") ? "active" : ""} >Medium</p>
                                        <p onClick={(e)=> handleRadioInput(e.target)} className={(difficulty === "Hard") ? "active" : ""} >Hard</p>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="schedule-test-right-container">
                            <div className="schedule-test-small-input-box">
                                    <h3>Duration</h3>
                                    <input ref={duration} defaultValue={duration.current.value} className="input-box" type="number" placeholder="10"></input>
                                    <p>Min.</p>
                            </div>
                            <div className="date-input-container">
                                <h3>Date</h3>
                                <div className="date-input-flex">
                                <div className="schedule-test-small-input-box">
                                    
                                    <input ref={day} defaultValue={day.current.value} className="input-box" type="number" placeholder="5"></input>
                                    <p>Day</p>
                                </div>
                                
                                <div className="schedule-test-small-input-box">
                                    
                                    <input ref={month} defaultValue={month.current.value} className="input-box" type="number" placeholder="12"></input>
                                    <p>Month</p>
                                </div>
                                
                                <div className="schedule-test-small-input-box">
                    
                                    <input ref={year} defaultValue={year.current.value} className="input-box" type="number" placeholder="2022"></input>
                                    <p>Year</p>
                                </div>
                                </div>
                            </div>
                            <div className="date-input-container">
                                <h3>Time</h3>
                                <div className="date-input-flex">
                                    <div className="schedule-test-small-input-box">
                    
                                    <input ref={hour} defaultValue={hour.current.value} className="input-box" type="number" placeholder="10"></input>
                                    <p>Hour</p>
                                </div>
                                
                                <div className="schedule-test-small-input-box">
                    
                                    <input ref={min} defaultValue={min.current.value} className="input-box" type="number" placeholder="10"></input>
                                    <p>Min</p>
                                </div>
                                </div>
                            </div>
                            <button onClick={() => handleSubmit()} className="btn-login btn-schedule">Schedule Test</button>
                        </div>
                    </div> 
                    </div>
                </div>
            </section>
        )
    }

    const mapPrevTestNew = (item)=>{
        console.log(item, "ITEM");
        return(
            <tr>
                <td data-label="Name">{item.name}</td>
                <td data-label="Scheduled On">{`${item.date.day}/${item.date.month}/${item.date.year}`}</td>
                <td data-label="Submitted">{item.days * -1} days ago</td>
                <td data-label="Link" className="table-link" onClick={()=> navigate(`/performance?id=${item.id}`)} >Visit</td>
            </tr>
        )
    }

    const mapUpTestNew = (item)=>{
        console.log(item);
        return(
            <tr>
                <td data-label="Name">{item.name}</td>
                <td data-label="Scheduled On">{`${item.date.day}/${item.date.month}/${item.date.year}`}</td>
                <td data-label="At">{`${item.date.time.hour} : ${item.date.time.min}`}</td>
                <td data-label="Days Left">{item.days * -1}</td>
                <td data-label="Duration">{item.duration} min</td>
                <td data-label="Link" className="table-link" onClick={()=> navigate(`/performance?id=${item.id}`)}>Visit</td>
            </tr>
        )
    }

    const DashboardSection = ()=>{
        return (
            <section className="section-dashboard">
                <Hero />
                <Navbar />
                <ScheduleTest />
                <div className="test-container">
                    <table>
                        <caption>Upcomming Tests</caption>
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Scheduled On</th>
                            <th scope="col">At</th>
                            <th scope="col">Days Left</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(upTest.length === 0) ? <p>0 Upcomming Tests</p> : upTest.map((t)=> mapUpTestNew(t))}
                        </tbody>
                    </table>

                </div>
                <div className="test-container">
                    <table>
                        <caption>Previous Tests</caption>
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Scheduled On</th>
                            <th scope="col">Submitted</th>
                            <th scope="col">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(prevTest.length === 0) ? <p>0 Previous Tests Tests</p> : prevTest.map((t)=> mapPrevTestNew(t))}
                        </tbody>
                    </table>
               
                </div>
            </section>
        )
    }

    return(
        <DashboardSection />
    )
};

export default InstituteDashboard;