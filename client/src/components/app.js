import React from 'react';
import {Route} from 'react-router-dom';
import Home from './home/home';
import ApplicationPage from './application_page';
import MeetTeam from './meet_team';
import AddItemReminders from './add_item_reminders';

export default () => (
    <div>
        <Route exact path="/" component={Home}/>
        <Route path="/application_page" component={ApplicationPage}/>
        <Route path="/meet_team" component={MeetTeam}/>
        <Route path="/add_item" component = {AddItemReminders}/>
    </div>
)



