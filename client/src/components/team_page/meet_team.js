import React, { Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import './teampage.css';
import MeetTeam from './images/meetteamlogo.png';
import Nav from "../navbar/nav";
import Member from './team_member';
import Sri from './team_sri';
import Julian from './team_julian';
import Michael from './team_michael';
import Andrew from './team_andrew';


export default props => {
    return <Fragment>
        <Nav />
        <div className="teampage-background">
          <div className="meetTeam teamCenter container-fluid">
            <Sri />           
            <Michael />                     
            <Julian />
            <Andrew />
          </div>
        </div>
      </Fragment>;
}
