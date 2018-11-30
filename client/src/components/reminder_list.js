import React, { Component } from 'react';
import './reminder_list.css';
import Popup from "reactjs-popup";
import Clock from './clock';


class ReminderList extends Component {


    checkTimeLeft(item){
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
    }

    render(){
        const listElements = this.props.data.map((item, index) => {
            const classChanged = this.checkTimeLeft(item);

            return <div key={item.id} className="listItemElements"><li onClick={() => {}}>
                <a href={item.url}>{item.title}</a>
                </li>
                <span className={classChanged} ><b>{item._hours}</b>  hours are left </span>
                <img src={item.icon}/>
                <Popup trigger={<button>See more info</button>}>
                    <div>
                        <div>
                            Notes: {item.notes}
                        </div>
                        <div>
                            <a href={item.url}>Website: {item.url}</a>
                        </div>
                    </div>
                </Popup>
            </div>;

        });

        return(
            <div className= "allListItemElements">
                <ul>
                {listElements}
                </ul>
            </div>

        );
    }
}

export default ReminderList;