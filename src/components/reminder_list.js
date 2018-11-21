import React, { Component } from 'react';
import './reminder_list.css';



class ReminderList extends Component {

    render(){

        const listElements = this.props.data.map((item, index) => {
            return <li onClick={() => {}} className="collection-item listItemElements" key={item._id}>
                <a href={item.website}>{item.website}</a>
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