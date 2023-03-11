import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Hero from "./Hero";

const StudentDashboard = ({data})=>{
    //Data
    const {prevTest, upTest} = data;

    const navigate = useNavigate();

    //Components
    const mapPrevTestNew = (item)=>{
        
        return(
            <tr>
                <td data-label="Name">{item.title}</td>
                <td data-label="Submitted At">{`${item.submittedAt.split("T")[0]}`}</td>
                <td data-label="Link" className="table-link" onClick={()=> navigate(`/submission?id=${item._id}`)} >Visit</td>
            </tr>
        )
    }

    const mapUpTestNew = (item) =>{
        

        return(
            <tr>
                <td data-label="Name">{item.name}</td>
                <td data-label="Scheduled On">{`${item.date.day}/${item.date.month}/${item.date.year}`}</td>
                <td data-label="At">{`${item.date.time.hour} : ${item.date.time.min}`}</td>
                <td data-label="Days Left">{item.days * -1}</td>
                <td data-label="Duration">{item.duration} min</td>
                <td data-label="Link" className="table-link" onClick={()=> navigate(`/test?id=${item.id}`)}>Start Test</td>
            </tr>
        )

    }

    const DashboardSection = ()=>{
        return (
            <section className="section-dashboard">
                <Hero />
                <Navbar />
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
                            <th scope="col">Submitted At</th>
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


    

    return (
        <DashboardSection />
    )
};

export default StudentDashboard;
