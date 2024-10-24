import React from "react";
import './hero.css'
import Heart from "./heart.png"
import hero_image from "./hero_image.png"  
import hero_image_back from "./hero_image_back.png"  

const Hero = () => {
    return (
        <div className="hero">
            <div className="left-h">
                <div className="hero-text">
                    <div><span className="stroke-text">
                        Shape </span><span>Your</span></div>
                    <div><span>
                        Ideal Body</span></div>
                    <div><span>
                        In here we will help you shape and build your ideal body and live up your life to the fullest</span></div>
                </div>

                <div className="hero-buttons">
                    <buttons className="btn">Get Started</buttons>
                    <buttons className="btn">Learn More</buttons>
                </div>
            </div>
            <div className="right-h">

                <div className="heart-rate">
                    <img src={Heart} alt="" />
                    <span>Heart Rate</span><span>116 BPM</span>
                </div>

                <img src={hero_image} alt="" className="hero-image" />
                <img src={hero_image_back} alt="" className="hero-image-back" />
            </div>
        </div>
    )
}

export default Hero