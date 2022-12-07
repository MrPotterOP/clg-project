import React from "react";


const Hero = ({img})=>{

    let url;

    if(!img){
        url = "/images/bg-art.jpg";
    }else{
        url = `/images/${img}.jpg`;
    }

    return(
        <section className="section-hero">
            <div className="hero-img-container">
                <div className="hero-bg-img" style={{"background": `url(${url})`}}></div>
                <p>यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जन:। स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥</p>
            </div>
        </section>
    )
}

export default Hero;