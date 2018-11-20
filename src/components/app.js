import React from 'react';
import '../assets/css/app.css';
import Nav from './nav';
import {Route} from 'react-router-dom';
import Home from './home';
import ApplicationPage from './application_page';
import MeetTeam from './meet_team';

const App = () => (

        <div className="container">
            <Nav/>
                <Route exact path="/" component={Home}/>
                <Route path="/application_page" component={ApplicationPage}/>
                <Route path="/meet_team" component={MeetTeam}/>
        </div>

);

export default App;
