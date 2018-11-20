import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';

export default props => (
        <ul className="nav nav-tabs mt-3 navExtras">
            <li className="nav-item">
                <NavLink exact to={'/'} activeClassName="active selected" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to={'/application_page'} activeClassName="active selected" className="nav-link">Application</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to={'/meet_team'} activeClassName="active selected" className="nav-link">Meet The Team</NavLink>
            </li>
        </ul>
)
