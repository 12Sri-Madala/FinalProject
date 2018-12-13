import React from 'react';
import SriPic from './images/sri.png';


const TeamMemberSri = () => {
    return (
        <div className="member-container">
            <img className="member-pic" src={SriPic} />
            <span className="id-card">
                <a href="http://google.com"><i className="fas fa-id-card"></i></a>
            </span>
            <span className="github">
                <a href="https://github.com/12Sri-Madala"><i className="fab fa-github"></i></a>
            </span>
            <span className="linkedin">
                <a href="https://www.linkedin.com/in/sridhar-madala-7b624a171/"><i className="fab fa-linkedin"></i></a>
            </span>
        </div>
    );
}

export default TeamMemberSri;