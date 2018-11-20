import React from 'react';
import ReminderList from './reminder_list';
import ExistingBookmarks from './existingbookmarks';
import ExistingFolders from './existingfolders';


const ApplicationPage = () => (
            <div>
                <h1>Application Page</h1>
                <ReminderList/>
                <h1>Bookmarks</h1>
                <ExistingBookmarks/>
                <h1>Folders</h1>
                <ExistingFolders/>
            </div>
)

export default ApplicationPage;