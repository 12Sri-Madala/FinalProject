import React from 'react';
import {Route} from 'react-router-dom';
import AddItemReminders from './add_item_reminders';
import ApplicationPage from './application_page';
import Home from './home/home';
import MeetTeam from './team_page/meet_team';

export default () => (
    <div>
        <Route exact path="/" component={Home}/>
        <Route path="/application_page" component={ApplicationPage}/>
        <Route path="/meet_team" component={MeetTeam}/>
        <Route path="/add_item" component = {AddItemReminders}/>
    </div>
)



