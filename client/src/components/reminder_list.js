import React, { Component } from 'react';
import './reminder_list.css';
import Popup from "reactjs-popup";
import Clock from './clock';


class ReminderList extends Component {


    /*checkTimeLeft(item){
        var classChanged = '';

       if(item._hours < 4){
            classChanged = 'lastTimeColor';
        }
       else if(item._hours < 8){
            classChanged = 'secondToLastTimeColor';
        }
        else if (item._hours < 12){
            classChanged = 'thirdToLastTimeColor';
       }
       else if (item._hours > 13){
            classChanged = 'fourthToLastTimeColor';
       }

       return classChanged;
    }*/

    render(){
        const listElements = this.props.data.map((item, index) => {
           /* const classChanged = this.checkTimeLeft(item);*/

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