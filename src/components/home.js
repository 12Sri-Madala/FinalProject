import React from 'react';
import './home.css';
import {GoogleLogin} from 'react-google-login';



export default props => {
    const responseGoogle = (response) => {
        console.log('google responsE!!!',response);
    }

    return (
        <div>
            <hr className="hrBar"></hr>

            <div className="homeDivPart">
                <h3>LOGIN AREA</h3>
                <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>Log In</button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                 className="ggLogin"/>
                <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>Sign Up</button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className="ggLogin"/>

                <a href="https://www.google.com" target="_blank">
                    <button type="button" className="btn btn-info">Get the Extension</button>
                </a>
            </div>


            <hr className="hrBar"></hr>


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

