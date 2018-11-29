import React from 'react';
import ExistingBookmarks from './existingbookmarks';
import ExistingFolders from './existingfolders';
import AllReminderList from './all_of_reminder_list';
import './applicationcss.css';

const ApplicationPage = () => (
    
    <div className="applicationDiv">

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