import React from 'react';
import './home.css';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize";
import extenstionVideo from '../../videos/Crease Extension.mp4';
import applicationPage from '../../videos/applicationpage.mp4';
import application from '../../videos/application.mp4';
import background from './images/title-background.jpg';
import logo from './images/crease-logo.png';
import descBody from './images/description-body.png';

export default props => {
    const responseGoogle = (response) => {
        
        console.log(document);
        console.log(`googleID=${response.googleId}`);
        console.log('google response:',response);

        document.cookie = `googleID=${response.googleId}`;
    }

    return (
        <div img src={background} className="homepage">
            <div className="home-login center">
                <div img src={logo} className="crease-logo"></div>

                <div className="login-area">
                    <a href='auth/google'><button className='login-button' type='button'>LOGIN</button></a>
                    <a href='http://localhost:8000/auth/google'><button className='login-button' type='button'>SIGNUP</button></a>
      
                </div>

                <div className="login-area">
                    <a href='http://localhost:3000/meet_team'><button className="login-button">MEET THE TEAM</button></a>
                </div>
            </div>
            
            <div img src={descBody} className="description-body">
                <div className="description-header">
                    <h3 className="center description-title">What is <span className="lobster">Crease</span> ?</h3>

                    <h6 className="center description-title"><span className="lobster">Crease</span> is an all-in-one bookmark manager for your inspirations and read laters</h6>
                </div>

                <div className="container video-container-parent">

                    <div className="row">
                        <div className="organize col s6 description-title">Organize and view with ease</div>
                        <div className="set col s4 offset-s2 description-title">Set a <span className="lobster">Crease</span> reminder</div>
                    </div>

                    <div className="row">
                        
                        <div className="col s5">
                            <video className="video-container" src={ application } loop autoPlay controls={true}></video>    
                        </div>

                        <div className="col s5 offset-s2">
                            <video className="video-container" src={ extenstionVideo } loop autoPlay controls={true}></video>
                        </div>
                    
                    </div>
                
                </div>
            </div>
        </div>
    )
}

