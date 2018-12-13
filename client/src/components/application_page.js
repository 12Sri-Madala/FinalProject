import React, { Component, Fragment } from 'react';
import ExistingBookmarks from './existingbookmarks';
import Reminders from './reminders';
import Nav from './navbar/nav';
import './application.css';


class ApplicationPage extends Component {

    render(){
        return (
            <Fragment>
                <Nav />
                     <div className="applicationDiv">


                <div className="reminder-section">

                    <Reminders  />
                </div>

                <div className="insideDiv rightDivApp">

                   <ExistingBookmarks />

                </div>

            </div>
            </Fragment>
        );
    }
}

export default ApplicationPage;