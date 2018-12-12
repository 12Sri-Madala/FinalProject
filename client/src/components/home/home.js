import React from 'react';
import './home.css';
import {GoogleLogin} from 'react-google-login';



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
            </div>
            
            <div className="description-body">
                <div className="description-header">
                    <h3 className="center description-title">What is <span className="lobster">Crease</span> ?</h3>
                    
                </div>
            </div>

            <div className="home-login center">
                <a href="#"><button className="login-button">Meet The Team</button></a>
            </div>
        </div>
    )
}

