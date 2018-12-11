import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import { NavLink, Link } from 'react-router-dom';
import './nav.css';

export default props => (
      <nav id="navbar">
         <div className="nav-wrapper main-nav">
           <Link className="brand-logo nav-logo" to="/application_page">Crease</Link>
            <ul id="nav-mobile" className="right">
               <li>
                  <NavLink to={'/application_page'} activeClassName="active selected" className="nav-link">Application</NavLink>
               </li>
               <li>
                  <NavLink to={'/meet_team'} activeClassName="active selected" className="nav-link">Meet The Team</NavLink>
               </li>
               <li>
                  <button className="red btn darken-2">Sign Out</button>
               </li>
            </ul>
         </div>
      </nav>
);
