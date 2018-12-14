import React, { Component } from 'react';
import ReminderList from './reminder_list';


class Reminders extends Component {
    constructor(props){
        super(props);

    }

    render(){
       return(
           <ReminderList data={this.props.list}/>
       )
    }
}

export default Reminders;


