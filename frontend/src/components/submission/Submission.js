import React,{useEffect, useState} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

import ErrorTest from "../test/ErrorTest";
import Hero from "../dashboard/Hero";

import "./submission.css";
import Loading from "../loading/Loading";
import Navbar from "../navbar/Navbar";

const Submission = ()=>{
    const [querry] = useSearchParams();
    const [id] = useState(querry.get("id"));
    
    const url = "http://localhost:4000/api/submission";
    const token = Cookies.get("token");
    const [data, setData] = useState();


    //Handlers

    const mapAnswers = ((i, j) => {
        return(<AnswerCard key={j} question={i.question} userAnswer={i.userAnswer} correctAnswer={i.correctAnswer} correct={i.correct} />)
    });

    //Components
    const AnswerCard = ({question, userAnswer, correctAnswer, correct})=>{
        return(
            <div className="submission-answer-card">
                <div className="question-container">
                <h2 className="question-title-h2">{question}</h2>
                <div className="answers-container">
                    <p className="answer-title">Your Answer</p>
                    <p className={!correct ? "answer-text" : "answer-text answer-text-correct"}>{userAnswer}</p>
                    {correct ? null :<><p className="answer-title">Correct Answer</p>
                    <p className="answer-text answer-text-correct">{correctAnswer}</p> </>}

                </div>
            </div>
            </div>
        )
    }

    const ShowData = ()=>{

        return(<>
            <Hero img={"bg-3"}/>
            <Navbar />
            <section className="section-submission">
                <div className="submissions-score-container">
                    <h1>Score</h1>
                    <p className="submission-score submission-score-right">Right: <span>{data.score.right}</span></p>
                    <p className="submission-score submission-score-wrong">Wrong: <span>{data.score.wrong}</span></p>
                </div>

                <div className="submissions-details-container">
                    <h1>Answers</h1>

                    <div className="submissions-answers-container">
                        {data.data.map((i, j) => mapAnswers(i, j))}
                    </div>
                </div>
            </section>

        </>
            
        )
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

        const fetchSubmission = ()=>{
            axios.patch(url, {submissionId: id}, {headers:{authorization: token}})
            .then(r => (r.status === 200) ? handleSuccess(r.data) : null)
            .catch(e => e.response.data ? handleError(e.response.data) : null)
        }

        //Main JS
        if(!id){
            setData({status:  "error", msg: "Invalid Submission Link"});
        }else{
            fetchSubmission();
        }
    }, [id, token]);

    

    


    return (<>
        {data ? <ConditionalRender /> : <Loading />}
    </>
    )
}

export default Submission;