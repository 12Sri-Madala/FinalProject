import React, { Component } from 'react';
import './reminder_list.css';



class ReminderList extends Component {

    render(){

        const listElements = this.props.data.map((item, index) => {
            return <li className="collection-item listItemElements" key={item._id}>
                {item.website}
                </li>;
        });

        return(
            <ul className="collection allListItemElements">
                {listElements}
            </ul>
        );
    }
}

export default ReminderList;