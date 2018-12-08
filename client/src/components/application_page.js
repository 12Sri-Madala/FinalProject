import React, { Component } from 'react';
import ExistingBookmarks from './existingbookmarks';
import AllReminderList from './all_of_reminder_list';
import './applicationcss.css';
import ReminderListRedux from './reminders/reminder_list_redux';

class ApplicationPage extends Component {

    render(){
        return (
            <div className="applicationDiv">


                <div className="insideDiv reminder-section">

                    <AllReminderList  />
                </div>

                <div className="insideDiv rightDivApp">
                    {/*<ReminderListRedux/>*/}


                   <ExistingBookmarks />

                </div>


            </div>

        )
    }
}

export default ApplicationPage;