import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <ul className="nav nav-tabs mt-3">
            <li className="nav-item">
                <Link to={'/'} className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                <Link to={'/application_page'} className="nav-link">Application</Link>
            </li>
            <li className="nav-item">
                <Link to={'/meet_team'} className="nav-link">Meet The Team</Link>
            </li>
        </ul>
    )
}