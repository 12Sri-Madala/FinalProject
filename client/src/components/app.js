import React from 'react';
import {Route} from 'react-router-dom';
import ApplicationPage from './application_page';
import Home from './home/home';
import MeetTeam from './team_page/meet_team';
import './application.css';

export default () => (
    <div className="appDivBeforeRoot">
        <Route exact path="/" component={Home}/>
        <Route path="/crease_dashboard" component={ApplicationPage}/>
        <Route path="/meet_team" component={MeetTeam}/>
    </div>
)



