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
import reactIcon from './icons/react-original.svg';
import CSS from './icons/css3-original.svg'
import HTML from './icons/html5-original.svg'
import Javascript from './icons/javascript-original.svg'
import NodeJS from './icons/nodejs-original.svg'
import Redux from './icons/redux.svg';

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
            <div className="home-login center" id="home-login">
                <div  className="crease-logo"></div>
                
                <div className="login-area">
                    <div className="login-button-container">
                        <a href='http://localhost:8000/auth/google'><button className='login-button' type='button'>LOGIN</button></a>
                        <a href='http://localhost:8000/auth/google'><button className='login-button' type='button'>SIGNUP</button></a>
                    </div>
                    <div className="device-message-container">
                        <p><i class="fas fa-exclamation-triangle"></i> Friendly Reminder <i class="fas fa-exclamation-triangle"></i></p>
                        <span class="device-message">
                            This application is built as a chrome extension which is currently incompatible with mobile devices.
                            Please download our application on your laptop or desktop to access our features.
                        </span>
                    </div>
                </div>

                <div className="login-area meet-team-container">
                    <a href='http://localhost:3000/teampage'><button className="login-button team-button">MEET THE TEAM</button></a>
                </div>
            </div>
            
            <div className="description-body">
                <div className="description-header">
                    <h3 className="description-title">What is <span className="lobster">Crease</span> ?</h3>

                    <h6 className="description-subtitle"><span className="lobster">Crease</span> is an all-in-one bookmark manager for your inspirations and read laters</h6>
                </div>

                <div className="container video-container-parent">

                    <div className="row">
                        <div className="organize col s6 description-title">Organize and view with ease</div>
                        <div className="set col s6 description-title">Set a <span className="lobster">Crease</span> reminder</div>
                    </div>

                    <div className="videos">
                        
                        <div className="col s5 organize-video">
                            <iframe className="videoSize"  src="https://www.youtube.com/embed/S-AT4nrDjgs?autoplay=1&loop=1&playlist=S-AT4nrDjgs" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>                        
                        </div>

                        <div className="col s5 offset-s2 set-reminder-video">
                            <iframe className="videoSize"  src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&loop=1&playlist=tgbNymZ7vqY" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>                        
                        </div>
                    
                    </div>
                    
                </div>

                <div className="phone-videos-container">

                    <div className="row">

                        <p className="organize description-title">Organize and view with ease</p>
                        <div className="organize-video">
                            <iframe width="420" height="345" src="https://www.youtube.com/embed/S-AT4nrDjgs?autoplay=1&loop=1&playlist=S-AT4nrDjgs" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>  
                        </div>
                                                
                    </div>

                    <div className="row">
                        
                        <p className="set description-title">Set a <span className="lobster">Crease</span> reminder</p>
                        <div className="set-reminder-video">
                            <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&loop=1&playlist=tgbNymZ7vqY" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>                        
                        </div>
                    
                    </div>
                    
                </div>
            </div>
            <div className="technologyUsed container">
                <div className="technologyText">
                    Technologies Used:
                </div>
                <div className="technologyIcons">
                    
                        <div className="iconContainer">
							<div class="icon">
								<img src={reactIcon}/>                                
							</div>
                            <div className="iconName">
                                React
                            </div>							
                        </div>
                        <div className="iconContainer">
							<div class="icon">
								<img src={CSS}/>                                
							</div>
                            <div className="iconName">
                                CSS
                            </div>							
                        </div>
                        <div className="iconContainer">
							<div class="icon">
								<img src={Redux}/>                                
							</div>
                            <div className="iconName">
                                Redux
                            </div>							
                        </div>
					
                </div>
                <div className="technologyIcons">
                    
                    <div className="iconContainer">
                        <div class="icon">
                            <img src={HTML}/>                                
                        </div>
                        <div className="iconName">
                            HTML
                        </div>							
                    </div>
                    <div className="iconContainer">
                        <div class="icon">
                            <img src={Javascript}/>                                
                        </div>
                        <div className="iconName">
                            Javascript
                        </div>							
                    </div>
                    <div className="iconContainer">
                        <div class="icon">
                            <img src={NodeJS}/>                                
                        </div>
                        <div className="iconName">
                            NodeJS
                        </div>							
                    </div>
                
            </div>
            </div>
        </div>
    )
}

