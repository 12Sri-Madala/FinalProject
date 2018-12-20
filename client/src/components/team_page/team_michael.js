import React from 'react';
import MichaelPic from './images/mike1.png';


const TeamMemberMichael = () => {
    return (
        <div className="member-container">
            <img className="member-pic" src={MichaelPic} />
            <span className="id-card">
                <a href="http://michaelgesfahani.com"><i className="fas fa-id-card"></i></a>
            </span>
            <span className="github">
                <a href="https://github.com/EsfahaniMichael"><i className="fab fa-github"></i></a>
            </span>
            <span className="linkedin">
                <a href="https://www.linkedin.com/in/esfahanimichael/"><i className="fab fa-linkedin"></i></a>
            </span>
        </div>
    );
}

export default TeamMemberMichael;