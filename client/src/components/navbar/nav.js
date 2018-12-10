import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import { NavLink } from 'react-router-dom';
import './nav.css';

export default props => (
         <nav>
         <div class="nav-wrapper">
           <a href="#" class="brand-logo">Crease</a>
           <ul id="nav-mobile" class="right hide-on-med-and-down">
             <li>
                <NavLink exact to={'/'} activeClassName="active selected" className="nav-link">Home</NavLink>
             </li>
             <li>
                <NavLink to={'/application_page'} activeClassName="active selected" className="nav-link">Application</NavLink>
             </li>
             <li>
                <NavLink to={'/meet_team'} activeClassName="active selected" className="nav-link">Meet The Team</NavLink>
             </li>
           </ul>
         </div>
       </nav>
);
