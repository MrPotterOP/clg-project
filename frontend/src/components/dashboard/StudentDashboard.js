import React from "react";

import Test from "./Test";
import Hero from "./Hero";

const StudentDashboard = ({data})=>{
    //Data
    const {prevTest, upTest} = data;

    //Components
    const mapTest = (t)=>{
        return(<Test key={t.id} name={t.name} upcomming={true} institute={false} date={t.date} today={t.today} days={t.days} id={t.id} duration={t.duration} score={0}/>);
    }

    const mapPrevTest = (t)=>{
        return(<Test key={t._id} name={t.title} upcomming={false} institute={false} date={t.date} today={t.today} days={t.days} id={t._id} duration={t.duration} score={t.score}/>);
    }

    const DashboardSection = ()=>{
        return (
            <section className="section-dashboard">
                <Hero />
                <div className="test-container">
                    <h1>Upcomming Tests</h1>
                    {(upTest.length === 0) ? <p className="no-test-font-text">0 Upcomming Tests</p> : upTest.map((t)=> mapTest(t))}
                </div>
                <div className="test-container">
                    <h1>Previous Tests</h1>
                    {(prevTest.length === 0) ? <p className="no-test-font-text">0 Previous Tests Tests</p> : prevTest.map((t)=> mapPrevTest(t))}
                </div>
            </section>
        )
    }


    

    return (
        <DashboardSection />
    )
};

export default StudentDashboard;
