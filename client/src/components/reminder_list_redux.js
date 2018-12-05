import React, { Component } from 'react';
import './reminder_list.css';
import Popup from "reactjs-popup";
import { connect } from 'react-redux';
import { getReminderList } from '../actions'


class ReminderList extends Component {
    componentDidMount(){
        this.props.getReminderList();
    }

    render(){
        return (
            <div>
                <h1>Reminder List !!</h1>
            </div>

        )
    }

}



export default connect(null, {
    getReminderList: getReminderList
})(ReminderList);