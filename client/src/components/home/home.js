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

        ///img src={background} --- this was in the div below this for some reason.. 
        <div  className="homepage">
            <div className="home-login center">
                <div  className="crease-logo"></div>

                <div className="login-area">
                    <a href='auth/google'><button className='login-button' type='button'>LOGIN</button></a>
                    <a href='auth/google'><button className='login-button' type='button'>SIGNUP</button></a>
      
                </div>

                <div className="login-area">
                    <a href='http://localhost:3000/teampage'><button className="login-button">MEET THE TEAM</button></a>
                </div>
            </div>
            
            <div className="description-body">
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
                            <iframe width="420" height="345" src="https://www.youtube.com/embed/S-AT4nrDjgs?autoplay=1&loop=1&playlist=S-AT4nrDjgs" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>                        
                        </div>

                        <div className="col s5 offset-s2">
                            <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&loop=1&playlist=tgbNymZ7vqY" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>                        
                        </div>
                    
                    </div>
                
                </div>
            </div>
        </div>
    )
}

