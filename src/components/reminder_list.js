//import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';

import reminder_list from '../dummy_data_bookmark_reminders/reminder_list'

class ReminderList extends Component {
constructor(props){
    super(props);
    this.state = {
        list: []
    }
}
    componentDidMount(){
    this.getReminderListData()
}
    getReminderListData(){
    //call server to get data
        this.setState({
            list: reminder_list
        });
    }
    render(){
    console.log('state:', this.state.list);
        console.log("the dattta", reminder_list);
        const listElements = this.state.list.map((item, index) => {
            return <li className="collection-item" key={item._id}>{item.website}</li>
        });

        return(
            <ul className="collection">
                {listElements}
            </ul>
        )
    }
}

export default ReminderList;