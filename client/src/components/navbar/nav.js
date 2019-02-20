import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import { NavLink, Link } from 'react-router-dom';
import './nav.css';

export default props => (
      <nav className="navbar">
         <div className="nav-wrapper main-nav">
           <Link className="brand-logo nav-logo" to="/application_page">Crease</Link>
            <ul id="nav-mobile" className="right">
               <li>
                  <a href='auth/google' activeClassName="active selected" className="nav-link">Crease Dashboard</a>
               </li>
               <li>
                  <NavLink to={'/teampage'} activeClassName="active selected" className="nav-link">Meet The Team</NavLink>
               </li>
               <li>
                  <a href='/auth/logout'><button className="btn-small red darken-1">Sign Out</button></a>
               </li>
            </ul>
         </div>
      </nav>
);
