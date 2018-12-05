import React from 'react';
import ExistingBookmarks from './existingbookmarks';
import ExistingFolders from './existingfolders';
import AllReminderList from './all_of_reminder_list';
import './applicationcss.css';
import ReminderListRedux from './reminder_list_redux';

const ApplicationPage = () => (
    
    <div className="applicationDiv">


        <div className="insideDiv leftDivApp">

            <AllReminderList  />
        </div>

        <div className="insideDiv rightDivApp">
            <ReminderListRedux/>


            {/*<ExistingBookmarks />

            <ExistingFolders />*/}

        </div>

  
    </div>

)

export default ApplicationPage;