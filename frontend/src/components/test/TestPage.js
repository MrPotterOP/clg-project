import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Hero from "../dashboard/Hero";


const TestPage = ({data}) =>{

    const url = "http://localhost:4000/api/submission";
    const token = Cookies.get("token");
    const navigate = useNavigate();
    const {list, testData, testId} = data;
    const [questionData, setQuestionData] = useState({
        currentQuestion: 0,
        answers: []
    });

    let endTime;
    const startTime = `${testData.date.time.hour} : ${testData.date.time.min}`;
    

    //Handlers

    const handleSuccess = (res)=>{
        alert(res.msg);
        navigate("/");
    }
    const handleError = (res) =>{
        alert(res.msg);
    }

    const postSubmission = ()=>{
        if(questionData.answers.includes(undefined)){
            alert("Answer all the questions before submission.")
        }else{
            axios.post(url, {testId, answers: questionData.answers}, {headers: {authorization: token}})
            .then(e => (e.status === 200) ? handleSuccess(e.data) : null)
            .catch(e => e.response.data ? handleError(e.response.data) : null);
        }
    }

    const handleOption = (q, a)=>{
        let updatedAnswers = [...questionData.answers];
        updatedAnswers[q] = a;

        setQuestionData(prev => ({...prev, answers: updatedAnswers}))
    }

    const handleSubmit = ()=>{
        if(list.length === questionData.answers.length){
            postSubmission();
        }else{
            alert("Answer all the questions before submission.")
        }
    }

    const handleNext = ()=>{
        if(questionData.currentQuestion < list.length - 1){
            setQuestionData(prev => ({...prev, currentQuestion: prev.currentQuestion + 1}));
        }
    }

    const handlePrev = ()=>{
        if(questionData.currentQuestion > 0){
            setQuestionData(prev => ({...prev, currentQuestion: prev.currentQuestion -1}));
        }
    }

    //Components
    const Question = ({id, question, options})=>{
        return(
            <div className="question-container">
                <h2 className="question-title-h1">{id + 1} /<span>{list.length}  </span>: {question}</h2>
                <div className="options-container">
                    <p onClick={()=> handleOption(questionData.currentQuestion ,0)} className={(questionData.answers[questionData.currentQuestion] === 0) ? "option selected" : "option"}>{options[0]}</p>
                    <p onClick={()=> handleOption(questionData.currentQuestion ,1)} className={(questionData.answers[questionData.currentQuestion] === 1) ? "option selected" : "option"}>{options[1]}</p>
                    <p onClick={()=> handleOption(questionData.currentQuestion ,2)} className={(questionData.answers[questionData.currentQuestion] === 2) ? "option selected" : "option"}>{options[2]}</p>
                    <p onClick={()=> handleOption(questionData.currentQuestion ,3)} className={(questionData.answers[questionData.currentQuestion] === 3) ? "option selected" : "option"}>{options[3]}</p>
                </div>
            </div>
        )
    }

    //main JS
    if(testData.duration > 60){
        const min = testData.duration % 60;
        const hour = (testData.duration - min) / 60;

        const endHour = (hour + testData.date.time.hour > 23) ? hour + testData.date.time.hour - 24 : testData.date.time.hour + hour;

        endTime = `${endHour} : ${testData.date.time.min + min}`;
    }else if(testData.date.time.min + testData.duration > 60){
        endTime = `${testData.date.time.hour + 1} : ${testData.date.time.min + testData.duration - 60}`
    }
    else{
        endTime = `${testData.date.time.hour} : ${testData.date.time.min + testData.duration}`
    }


    return(
        <section className="section-live-test">
            <Hero img={"test-bg"} />
        <div className="live-test-container">
                        <div className="live-test-details-container">
                        <Link className="nav-link" to="/dashboard">go back to HOME</Link>
                            <h1>{testData.name}</h1>
                            <p>{testData.description}</p>
                        </div>
                        <div className="live-test-details-container">
                            <p className="live-test-note">Test Started at  <span>{startTime}</span>, Ends at <span>{endTime}</span></p>
                            <p className="live-test-note">No Submissions can be done after {endTime}</p>
                        </div>
                        <div className="test-questions-container">
                            <Question id={questionData.currentQuestion} question={list[questionData.currentQuestion].question} options={list[questionData.currentQuestion].options} />
                        </div>
                        <div className="questions-navigate-container">
                            <button onClick={()=> handlePrev()} className="btn-navigate previous" >Previous</button>
                            <button onClick={()=> handleNext()} className="btn-navigate next" >Next</button>
                            <button onClick={()=> handleSubmit()} className="btn-navigate submit">Submit</button>
                        </div>
        </div>
            
            
        </section>
    )
}

export default TestPage;