import React from 'react';
import './home.css';
import {GoogleLogin} from 'react-google-login';



export default props => {
    const responseGoogle = (response) => {
        console.log(document);
        console.log(`googleID=${response.googleId}`);
        document.cookie = `googleID=${response.googleId}`;
        //document.cookie = `googleID=${}; Expires: Thu, 31 Dec 2100 00:00:00 UTC`
        //props.cookies.set('test','michael is missing a link', { path: '/'});
        console.log('google responsE!!!',response);
    }

    return (
        <div className="homepage">
            <div className="home-login center">
                <div className="crease-logo"></div>
                <div className="login-area">
                    {/* <GoogleLogin
                        clientId="598168008370-672mn1c1275upurncu8kscricunf3tdc.apps.googleusercontent.com"
                        render={renderProps => ( */}
                            <button className="login-button" type="button"><a href="http://localhost:8000/auth/google" target="_blank">LOGIN</a></button>
                        {/* )}
                        buttonText="LOGIN"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    /> */}
                    <GoogleLogin
                        clientId="598168008370-672mn1c1275upurncu8kscricunf3tdc.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className="login-button" type="button" onClick={renderProps.onClick}>SIGN UP</button>
                        )}
                        buttonText="SIGN UP"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                </div>
            </div>
            
            <div className="description-body">
                <div className="description-header">
                    <h3 className="center description-title">What is <span className="lobster">Crease</span> ?</h3>
                </div>
            </div>

            <div className="video-body">
                <h3>VIDEO AREA</h3>
            </div>

            <hr className="hrBar"></hr>

            <div className="homeDivPart">
                <h3>LOGIN AREA</h3>
            </div>
        </div>
    )
}

