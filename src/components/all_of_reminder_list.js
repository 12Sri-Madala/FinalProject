import React, { Component } from 'react';
import ReminderList from './reminder_list';
import reminder_list from '../dummy_data_bookmark_reminders/reminder_list';


class AllReminderList extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: []
        }
    }
    componentDidMount(){
        this.getReminderListData();
    }
    getReminderListData(){
        //call server to get data
        this.setState({
            list: reminder_list
        });
    }
    render(){
       return(
           <ReminderList data={this.state.list}/>
       )

    }
}

export default AllReminderList;


