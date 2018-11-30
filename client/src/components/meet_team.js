import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import './team_page/teampage.css';
import MeetTeam from './team_page/images/meetteamlogo.png';
import Member from './team_page/team_member';


export default props =>(

        <div className="teampage-background">
            <div className="meetteam center">
                <Member />
                <div className="meetteam-logo">
                    <img className="meetteam-logo" src={MeetTeam} />
                </div>
                <Member />
            </div>
        </div>
)
