import React, { Component } from 'react';
import axios from 'axios';
import ReminderList from './reminder_list';
import reminder_list from '../dummy_data_bookmark_reminders/reminder_list';



//const BASE_URL = 'http://api.reactprototypes.com/todos';
//const API_KEY = 'c718_demouser';

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


