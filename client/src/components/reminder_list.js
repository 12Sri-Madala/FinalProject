import React, { Component } from 'react';
import './reminder_list.css';
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';


class ReminderList extends Component {


    render(){
        const listElements = this.props.data.map((item, index) => {

            return(
             <div key={item.id} className="listItemElements">
                    <img className="iconStyle partOfList" src={item.icon}/>
                    <li className="partOfList inLine listStyle" onClick={() => {}}>
                        <a className="inLine titleClass" href={item.url}>{item.title}</a>
                        <div  className="inLine dateClass">
                            <p className="insideDateClass">{item.time}</p>
                            <p className="insideDateClass">{item.date}</p>
                        </div>

                    </li>
                    <Popup trigger={<button className="btnList">info</button>}>
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