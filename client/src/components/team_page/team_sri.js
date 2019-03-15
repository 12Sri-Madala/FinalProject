import React from 'react';
import SriPic from './images/sri_final.jpg';


const TeamMemberSri = () => {
    return (
        <div className="member-container">
            <img className="member-pic" src={SriPic} />
            <div>
                <div className="iconSection">
                    <div className="id-card">
                        <a href="http://sridharmadala.com"><i className="fas fa-id-card"></i></a>
                    </div>
                    <div className="github">
                        <a href="https://github.com/12Sri-Madala"><i className="fab fa-github"></i></a>
                    </div>
                    <div className="linkedin">
                        <a href="https://www.linkedin.com/in/sridhar-madala-7b624a171/"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div>
                    <p className="nameStyle">Sridhar Madala</p>
                    <p className="nameStyle devStyle">Backend Developer</p>
                </div>       
            </div>
        </div>
    );
}

export default TeamMemberSri;