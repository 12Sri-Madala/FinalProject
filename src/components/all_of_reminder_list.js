import React, { Component } from 'react';
import ReminderList from './reminder_list';


class AllReminderList extends Component {
    render(){
        return(
            <div>
                <h6>MICHAEL's WORK AREA</h6>
                <ReminderList/>
            </div>
        )
    }
}

export default AllReminderList;