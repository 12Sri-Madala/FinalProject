import React from 'react';
import AndrewPic from './images/andrew.png';


const TeamMemberAndrew = () => {
    return (
        <div className="member-container">
            <img className="member-pic" src={AndrewPic} />
            <span className="id-card">
                <a href="http://andrewmirs.tech"><i className="fas fa-id-card"></i></a>
            </span>
            <span className="github">
                <a href="https://github.com/andrewmirs"><i className="fab fa-github"></i></a>
            </span>
            <span className="linkedin">
                <a href="https://www.linkedin.com/in/andrewmirshafiee/"><i className="fab fa-linkedin"></i></a>
            </span>
        </div>
    );
}

export default TeamMemberAndrew;