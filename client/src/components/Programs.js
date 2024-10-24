import React from "react";
import { programsData } from "./programsData";
import RightArrow from './rightArrow.png'
import './Programs.css'

const Programs = () => {
    return(
    <div className="Programs" id="Programs">
        <div className="programs-header">
            <span>Why Join Us</span>
        </div>

        <div className="program-categories">
            {programsData.map((program) => (
                <div className="category">
                    {program.image}
                    <span>{program.heading}</span>
                    <span>{program.details}</span>
                    <div className="join-now"><span>Join now</span><img src={RightArrow} alt="" /></div>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Programs