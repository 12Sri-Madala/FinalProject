import React from 'react';
import './home.css';
import {GoogleLogin} from 'react-google-login';



export default props => {
    const responseGoogle = (response) => {
        console.log('google responsE!!!',response);
    }

    return (
        <div className="homepage">
            <div className="home-login center">
                <div className="crease-logo"></div>
                <div className="login-area">
                    <button className="login-button" type="button">LOG IN</button>
                    <button className="login-button" type="button">SIGN UP</button>
                </div>
            </div>

            <div className="description-header">
                <h3 className="center description-title">What is <span className="lobster">Crease</span> ?</h3>
            </div>
            <div className="homeDivPart">
                <h3>DESCRIPTION AREA</h3>
            </div>

            <hr className="hrBar"></hr>

            <div className="homeDivPart">
                <h3>VIDEO AREA</h3>
            </div>

            <hr className="hrBar"></hr>

            <div className="homeDivPart">
                <h3>LOGIN AREA</h3>
            </div>
        </div>
    )
}

