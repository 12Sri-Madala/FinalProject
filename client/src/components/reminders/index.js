import React, { Component } from 'react';
import ReminderList from './reminder_list';


class Reminders extends Component {
    constructor(props){
        super(props);

    }

    componentWillReceiveProps(newProps){
        if (newProps.list !== this.props.list){
            newProps.list.sort((a,b)=>{
                return Date.parse(`${a.date} ${a.time}`) - Date.parse(`${b.date} ${b.time}`);
            });
        }
        return newProps;
    }

    // sortReminders = () => {
    //     this.props.list.sort((a,b)=>{
    //         return Date.parse(`${a.date} ${a.time}`) - Date.parse(`${b.date} ${b.time}`);
    //     })
    // }

    render(){
        console.log(this.props.list);

       return(
           <ReminderList data={this.props.list}/>
       )
    }
}

export default Reminders;


