import React from 'react';
import ExistingBookmarks from './existingbookmarks';
import ExistingFolders from './existingfolders';
import AllReminderList from './all_of_reminder_list';
import './applicationcss.css';
import Nav from './nav'

const ApplicationPage = () => (
    
    <div className="applicationDiv">
        <Nav/>

        <div className="insideDiv leftDivApp">

            <AllReminderList  />
        </div>

        <div className="insideDiv rightDivApp">

            <ExistingBookmarks />

            <ExistingFolders />

        </div>

  
    </div>

)

export default ApplicationPage;