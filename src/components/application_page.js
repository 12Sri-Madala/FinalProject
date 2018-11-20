import React from 'react';
import ExistingBookmarks from './existingbookmarks';
import AllReminderList from './all_of_reminder_list';
import './applicationcss.css';


const ApplicationPage = () => (
    <div>

        <AllReminderList className="applicationDivs"/>


        <ExistingBookmarks className="applicationDivs"/>

    </div>

)

export default ApplicationPage;