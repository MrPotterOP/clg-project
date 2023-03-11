import React,{useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

import Hero from "../dashboard/Hero";
import Navbar from "../navbar/Navbar";
import Timer from "../timer/Timer";


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
       
        
            axios.post(url, {testId, answers: questionData.answers}, {headers: {authorization: token}})
            .then(e => (e.status === 200) ? handleSuccess(e.data) : null)
            .catch(e => e.response.data ? handleError(e.response.data) : null);
        
    }

    const handleOption = (q, a)=>{
        let updatedAnswers = [...questionData.answers];
        updatedAnswers[q] = a;

        setQuestionData(prev => ({...prev, answers: updatedAnswers}))
    }

    const handleSubmit = ()=>{
        if(window.confirm("Are you sure to submit test.")){
            postSubmission();
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

    const handleQTagClick = (i)=>{
        setQuestionData(prev => ({...prev, currentQuestion: i}))
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

    

    const QuestionsTopBar = ()=>{

        const Qtag = ({num})=>{
            return(
                <>
                    <div className={(questionData.answers[num] >= 0) ? "topbar-item-container-solved" : "topbar-item-container"} onClick={()=> handleQTagClick(num)}>
                     <p className="topbar-item" key={num + 1} >{num + 1}</p>
                    </div>
                </>
               
            )
        }

        return(
            <div className="questions-topbar">
                <div className="questions-topbar-container">
                {list.map((t, i)=> <Qtag num={i}/>)}
                </div>
            </div>
        )
    }

    //main JS

    const today = moment();
    const someday = moment([testData.date.year, testData.date.month - 1, testData.date.day, testData.date.time.hour, testData.date.time.min, 0, 0]).add(testData.duration, "minutes");
    const difff = someday.diff(today) - 500;


    var timer;
    useEffect(()=>{
        timer = setInterval(()=>{
            postSubmission();
        }, difff);

        return ()=> clearInterval(timer);
    });

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
            <Navbar />
        <div className="live-test-container">
                        <div className="live-test-details-container">
                            <h1>{testData.name}</h1>
                            <p>{testData.description}</p>
                        </div>
                        <Timer date={testData.date} duration={testData.duration}/>
                        <div className="live-test-details-container">
                            <p className="live-test-note">Test Started at  <span>{startTime}</span>, Ends at <span>{endTime}</span></p>
                            <p className="live-test-note">No Submissions can be done after {endTime}</p>
                        </div>

                        <QuestionsTopBar />

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