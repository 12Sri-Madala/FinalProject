import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import './teampage.css';
import Nav from "../navbar/nav";
import Member from './team_member';
import Sri from './team_sri';
import Julian from './team_julian';
import Michael from './team_michael';
import Andrew from './team_andrew';





class MeetTeam extends Component{
    render(){
    return(
      <Fragment>
      <Nav />
      <div className="teampage-background">
        <div className="meetTeam teamCenter container-fluid">
          <div className="teamPageTitle">
            <h4>Meet The Team</h4>
          </div>
          <Andrew />          
          <Michael />                     
          <Julian />
          <Sri /> 
        </div>
      </div>
    </Fragment>
    )
  }
}

export default MeetTeam;

