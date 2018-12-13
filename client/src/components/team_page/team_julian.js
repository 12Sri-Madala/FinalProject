import React from 'react';
import JulianPic from './images/julian .png';


const TeamMemberJulian = () => {
    return (
        <div className="member-container">
            <img className="member-pic" src={JulianPic} />
            <span className="id-card">
                <a href="http://julianso.com"><i className="fas fa-id-card"></i></a>
            </span>
            <span className="github">
                <a href="https://github.com/julianso89"><i className="fab fa-github"></i></a>
            </span>
            <span className="linkedin">
                <a href="https://www.linkedin.com/in/sojulian/"><i className="fab fa-linkedin"></i></a>
            </span>
        </div>
    );
}

export default TeamMemberJulian;