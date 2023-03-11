import React,{useState, useEffect} from "react";
import moment from "moment";

import "./timer.css";



const Timer = ({date, duration})=>{
    const today = moment();
    const someday = moment([date.year, date.month - 1, date.day, date.time.hour, date.time.min, 0, 0]).add(duration, "minutes");
    const difff = someday.diff(today, 'seconds');
    
    const [remainingTime, setRemainingTime] = useState();

    var timer;

    useEffect(()=>{
        timer = setInterval(()=>{
        if(difff > 60){
            let temp =  Math.floor(difff / 60);
            let h = Math.floor(temp / 60);
            let s = difff % 60;
            setRemainingTime(()=> h.toString().padStart(2, '0') + " : " + temp.toString().padStart(2, '0') + " : " + s.toString().padStart(2, '0'))
        }else{
            setRemainingTime(()=> difff - 1)
        }
        } , 1000)
        
        return () => clearInterval(timer);
    })

    

    return(
        <div className="timer-container">
            <p>Test will be autosubmit after </p>
            <h3 onClick={()=> setRemainingTime((prev)=> prev - 1)}>    {remainingTime}  </h3>
        </div>
        
    )
}

export default Timer;