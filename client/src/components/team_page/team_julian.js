import React from 'react';
// import JulianPic from './images/julian.png';
import JulianPic from './images/sriImage_square.jpg';

const TeamMemberJulian = () => {
    return (
        <div className="member-container">
            <img className="member-pic" src={JulianPic} />
            <div>
                <div className="iconSection">
                    <div className="id-card">
                        <a href="http://julianso.com"><i className="fas fa-id-card"></i></a>
                    </div>
                    <div className="github">
                        <a href="https://github.com/julianso89"><i className="fab fa-github"></i></a>
                    </div>
                    <div className="linkedin">
                        <a href="https://www.linkedin.com/in/sojulian/"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div>
                    <p className="nameStyle">Julian So</p>
                </div>       
            </div>
        </div>
    );
}

export default TeamMemberJulian;