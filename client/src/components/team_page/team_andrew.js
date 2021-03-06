import React from 'react';
// import AndrewPic from './images/andrew.png';
import AndrewPic from './images/Andrew_final.jpg';


const TeamMemberAndrew = () => {
    return (
        <div className="member-container">
            <img className="member-pic" src={AndrewPic} />
            
                <div className="iconSection">
                    <div className="id-card">
                        <a href="http://andrewmirs.tech"><i className="fas fa-id-card"></i></a>
                    </div>
                    <div className="github">
                        <a href="https://github.com/andrewmirs"><i className="fab fa-github"></i></a>
                    </div>
                    <div className="linkedin">
                        <a href="https://www.linkedin.com/in/andrewmirshafiee/"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div>
                    <p className="nameStyle">Andrew Mirshafiee</p>
                    <p className="nameStyle devStyle">Frontend Developer</p>
                </div>       
            
        </div>

  
    );
}

export default TeamMemberAndrew;