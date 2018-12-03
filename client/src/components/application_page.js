import React from 'react';
import ExistingBookmarks from './existingbookmarks';
import ExistingFolders from './existingfolders';
import AllReminderList from './all_of_reminder_list';
import './applicationcss.css';
import Nav from './nav'
import ReminderListRedux from './reminder_list_redux';

const ApplicationPage = () => (
    
    <div className="applicationDiv">
        <Nav/>

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