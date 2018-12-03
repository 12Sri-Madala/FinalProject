import React, { Component } from 'react';
import './reminder_list.css';
import Popup from "reactjs-popup";


class ReminderList extends Component {


    render(){
        const listElements = this.props.data.map((item, index) => {

            return(
                <div key={item.id} className="listItemElements">

                    <img className="iconStyle partOfList" src={item.icon}/>
                <li className="partOfList" onClick={() => {}}>
                    <a href={item.url}>{item.title}</a>
                    <span ><b>{item.time}{item.date}</b></span>
                </li>

                <Popup trigger={<button className="btnList">See more info</button>}>
                    <div>
                        <div>
                            Notes: {item.notes}
                        </div>
                        <div>
                            <a href={item.url}>Website: {item.url}</a>
                        </div>
                    </div>
                </Popup>
            </div>
        )

        });

        return(
            <div>
                <ul  className= "allListItemElements">
                {listElements}
                </ul>
            </div>

        );
    }
}

export default ReminderList;