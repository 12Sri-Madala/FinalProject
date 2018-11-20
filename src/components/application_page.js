import React from 'react';
import ReminderList from './reminder_list';
import ExistingBookmarks from './existingbookmarks';
import './applicationcss.css';


const ApplicationPage = () => (
            <div>

                <div className="applicationDivs">
                    <h6>MICHAEL's WORK AREA</h6>
                    <ReminderList />

                </div>
                <div className="applicationDivs">
                    <h6>JULIAN's WORK AREA</h6>
                    <ExistingBookmarks/>
                </div>

            </div>
)

export default ApplicationPage;