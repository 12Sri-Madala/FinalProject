/*
import React from 'react';
import './home.css';
import {GoogleLogin} from 'react-google-login';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';


export default props => {
    const responseGoogle = (response) => {
        console.log('google responsE!!!',response);
    }
    return (
        <div>
            <hr className="hrBar"></hr>

            <div className="homeDivPart row">

                <GoogleLogin
                    clientId="789130565798-ud616gfbsn8jv90803gvk44ltl6al47l.apps.googleusercontent.com"
                    render={renderProps => (
                        <button className="ggLogin col s6  blue btn" onClick={renderProps.onClick}>Log In</button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                 />


                <GoogleLogin
                    clientId="789130565798-ud616gfbsn8jv90803gvk44ltl6al47l.apps.googleusercontent.com"
                    render={renderProps => (
                        <button className="ggLogin col s6 blue btn" onClick={renderProps.onClick}>Sign Up</button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    />

                <a href="https://www.google.com" target="_blank">
                    <button type="button" className="btn btn-info  col s3">Get the Extension</button>
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

*/
