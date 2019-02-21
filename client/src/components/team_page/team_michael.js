import React from 'react';
import MichaelPic from './images/mike1.png';


const TeamMemberMichael = () => {
    return (
        <div className="member-container">
            <img className="member-pic" src={MichaelPic} />
            <div>
                <div className="iconSection">
                    <div className="id-card">
                        <a href="http://michaelgesfahani.com"><i className="fas fa-id-card"></i></a>
                    </div>
                    <div className="github">
                        <a href="https://github.com/EsfahaniMichael"><i className="fab fa-github"></i></a>
                    </div>
                    <div className="linkedin">
                        <a href="https://www.linkedin.com/in/esfahanimichael/"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div>
                    <p className="nameStyle">Michael Esfahani</p>
                </div>
            
            </div>
        </div>
    );
}

export default TeamMemberMichael;