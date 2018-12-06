import React, { Component } from 'react';
import './reminder_list.css';
import Popup from "reactjs-popup";


class Reminder extends Component {

    daysRemaining = ( date, time ) => {
        var dateTime = `${date} ${time}`;
        var countdown = getTimeRemaining( dateTime );
    
        if( countdown.days > 0){
            return (
                <div  className="inLine dateClass">
                    <p className="insideDateClass">{countdown.hours + 'H'}</p>
                    <p className="insideDateClass">{countdown.days + 'D'}</p>
                </div>
            );
        } else {
            return (
                <div  className="inLine dateClass">
                    <p className="insideDateClass">{countdown.hours + 'H'}</p>
                </div>
            );
        }
    }

    render(){
        const listElements = this.props.data.map((item, index) => {
            return(
             <div key={item.id} className="listItemElements">
                    <img className="iconStyle partOfList" src={item.icon}/>
                    <li className="partOfList inLine listStyle" onClick={() => {}}>
                        <a className="inLine titleClass" href={item.url}>{item.title}</a>
                        {this.daysRemaining( item.date, item.time )}
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

function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
    };
}

export default Reminder;