import React from "react";
import { Link } from "react-router-dom";


const Test = ({name ,institute, date, today, days, id, duration, score, upcomming}) =>{


    let link;



    const TestRightContext = ()=>{
        if(upcomming || institute){
            return(
                <>
                    <p>{date.day}-{date.month}-{date.year}</p>
                    <p>{date.time.hour}:{date.time.min}</p>
                </>
            )
        }else {
            return(
                <>
                    <p>Score</p>
                    <p>Right: <span>{score.right}</span></p>
                    <p>Wrong: <span>{score.wrong}</span></p>
                </>
            )
        }
    }

    const Days = ()=>{
        if(upcomming && institute){
            return (<p className="test-card-days">{days} day/days to go.</p>)
        }else if(!upcomming && institute){
            return (<p className="test-card-days">{days * -1} day/days ago.</p>)
        }
    }
    //Main JS
    if(institute){
        link = `/performance?id=${id}`;
    }else if(upcomming){
        link = `/test?id=${id}`;
    }else{
        link = `/submission?id=${id}`;
    }


    return(
        <div className="test-card-container">
            <div className="test-card-left-container">
                <img className="test-card-icon" src={upcomming ? "/images/up.png" : "/images/prev.png"} alt="test-card"></img>
                <div className="left-card-sub-container">
                    <h2 className="test-title">{name}</h2>
                    {upcomming ? <p className="test-card-duration">Duration: <span>{duration} min.</span></p> : null}
                    <Days />
                </div>
               
            </div>
            <div className="test-card-right-container">
                <TestRightContext />
                <Link to={link}><button className="btn-login btn-view">View.</button></Link>
            </div>
        </div>
    )
}

export default Test;