import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';

export default props => (
        <ul className="navExtras">
            <li className="">
                <NavLink exact to={'/'} activeClassName="active selected" className="nav-link">Home</NavLink>
            </li>
            <li className="">
                <NavLink to={'/application_page'} activeClassName="active selected" className="nav-link">Application</NavLink>
            </li>
            <li className="">
                <NavLink to={'/meet_team'} activeClassName="active selected" className="nav-link">Meet The Team</NavLink>
            </li>
        </ul>
)
