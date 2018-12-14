import React from 'react';
import './home.css';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize";
import extenstionVideo from '../../videos/Crease Extension.mp4'


export default props => {
    const responseGoogle = (response) => {
        
        console.log(document);
        console.log(`googleID=${response.googleId}`);
        console.log('google response:',response);

        document.cookie = `googleID=${response.googleId}`;
    }

    return (
        <div className="homepage">
            <div className="home-login center">
                <div className="crease-logo"></div>

                <div className="login-area">
                    <a href='http://localhost:8000/auth/google'><button className='login-button' type='button'>LOGIN</button></a>
                    <a href='http://localhost:8000/auth/google'><button className='login-button' type='button'>SIGNUP</button></a>
      
                </div>
                <br/>
                <br/>
                <div className="login-area">
                    <a href='http://localhost:3000/meet_team'><button className="login-button">MEET THE TEAM</button></a>
                </div>
            </div>
            
            <div className="description-body">
                <div className="description-header">
                    <h3 className="center description-title">What is <span className="lobster">Crease</span> ?</h3>
                    <br/>
                    <h6 className="center description-title"><span className="lobster">Crease</span> is an all-in-one bookmark manager for your inspirations and read laters</h6>
                </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                <div className="container">

                    <div className="row">
                        <div className="col s6 description-title">Organize and view with ease</div>
                        <div className="col s5 offset-s1 description-title">Set a <span className="lobster">Crease</span> reminder alert</div>
                    </div>

                    <div className="row">
                        
                        <div className="col s5">
                            <video className="video-container" src={ extenstionVideo } loop autoPlay></video>    
                        </div>

                        <div className="col s5 offset-s2">
                            <video className="video-container" src={ extenstionVideo } loop autoPlay></video>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

