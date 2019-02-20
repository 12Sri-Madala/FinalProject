import React, { Component } from 'react';
import ReminderList from './reminder_list';


class Reminders extends Component {
    
    componentWillReceiveProps(newProps){
        if (newProps.list !== this.props.list){
            newProps.list.sort((a,b)=>{
                return Date.parse(`${a.date} ${a.time}`) - Date.parse(`${b.date} ${b.time}`);
            });
        }
        return newProps;
    }

    render(){
       

       return(
           <ReminderList updateReminders={this.props.updateReminders}  data={this.props.list}/>
       )
    }
}

export default Reminders;


