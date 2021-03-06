import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './nav.css';

const Nav = props => {
 return (
      <nav className="navbar">
         <div className="nav-wrapper main-nav">
           <Link className="logoCrease brand-logo nav-logo" to="/">Crease</Link>
            <ul id="nav-mobile" className="right">
               <li>
                  <NavLink to={'/'} className="nav-link">Home</NavLink>
               </li>
               
               <li>
                  {
                     props.auth
                        ? <a href='/crease_dashboard' className="nav-link dashboardLink">Dashboard</a>
                        : <a href='/auth/google'>Dashboard</a>
                  }
               </li>
               <li>
                  <NavLink to={'/teampage'} className="nav-link teamLink">Team</NavLink>
               </li>
               
               <li>
                  {
                     props.auth
                        ? <a href='/auth/logout'><button className="btn-small authButtons red darken-1">Sign Out</button></a>
                        : <a href='/auth/google'><button className="btn-small authButtons green darken-1">Sign In</button></a>
                  }
               </li>
            </ul>
         </div>
      </nav>
)};

const mapStateToProps = ({auth}) => ({ ...auth });

export default connect(mapStateToProps)(Nav);
