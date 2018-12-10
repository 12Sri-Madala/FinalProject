import React, { Component, Fragment } from 'react';
import Folder from './existingbookmarks/existingbookmarks';
import AllReminderList from './all_of_reminder_list';
import Nav from './navbar/nav';
import './applicationcss.css';
import ReminderListRedux from './reminders/reminder_list_redux';

class ApplicationPage extends Component {

    render(){
        return (
            <Fragment>
                <Nav />
                <div className="applicationDiv">


                    <div className="insideDiv reminder-section">

                        <AllReminderList  />
                    </div>

                    <div className="insideDiv rightDivApp">

                    <Folder />

                    </div>


                </div>
            </Fragment>
        );
    }
}

export default ApplicationPage;