import React, { Component } from 'react';
import axios from 'axios';
import ReminderList from './reminder_list';
import dummy_data from '../../dummy_data_bookmark_reminders/reminder_list';


class Reminders extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: []
        }
    }

    componentDidMount(){
        this.authCall();
        // this.getReminderListData;
    }

    authCall = async () => {

        const resp = await axios.get("/auth/getBookmarks",{withCredentials: true});
        resp.data.reminders.sort((a, b) => {
            return Date.parse(`${a.date} ${a.time}`) - Date.parse(`${b.date} ${b.time}`);
        });

        console.log("bookmarks accessed:", resp);
         this.setState({
             list: resp.data.reminders

         })
    }

    render(){
       return(
           <ReminderList data={this.state.list}/>


       )

    }
}

export default Reminders;


