import React from 'react';
import '../assets/css/app.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Home from './home';
import ApplicationPage from './application_page';
import MeetTeam from './meet_team';
import ExistingBookmarks from './existingbookmarks';

const App = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/application_page">Application</Link>
                </li>
                <li>
                    <Link to="/meet_team">Meet the team</Link>
                </li>
            </ul>
            
            <ExistingBookmarks/>

            <Route exact path="/" component={Home}/>
            <Route path="/application_page" component={ApplicationPage}/>
            <Route path="/meet_team" component={MeetTeam}/>
        </div>

    </Router>
);

export default App;
