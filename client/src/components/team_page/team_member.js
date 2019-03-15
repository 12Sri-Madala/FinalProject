import React from 'react';
import Blank from './images/blank-member.png';


const TeamMember = () => {
    return (
            <div className="member-container">
                <img className="member-pic" src={Blank} />
                <span className="id-card">
                    <a href="http://google.com"><i className="fas fa-id-card"></i></a>
                </span>
                <span className="github">
                    <a href="http://github.com"><i className="fab fa-github"></i></a>
                </span>
                <span className="linkedin">
                    <a href="http://linkedin.com"><i className="fab fa-linkedin"></i></a>
                </span>
            </div>
    );
}

export default TeamMember;