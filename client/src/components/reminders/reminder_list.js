import React, { Component } from 'react';
import './reminder_list.css';
import Popup from "reactjs-popup";


class Reminder extends Component {

    reminderBackground = (index) => {
        if ( index%2 === 0 ){
            return 'light-reminder-background';
        }
        return 'dark-reminder-background';
    }

    daysRemaining = ( date, time ) => {
        var dateTime = `${date} ${time}`;
        var countdown = getTimeRemaining( dateTime );
    
        if( countdown.days > 0){
            return (
                <div  className="countdown">
                    <p className="insideDateClass">{countdown.hours + 'H'}</p>
                    <p className="insideDateClass">{countdown.days + 'D'}</p>
                </div>
            );
        } else {
            return (
                <div  className="countdown">
                    <p className="insideDateClass">{ time }</p>
                </div>
            );
        }
    }

    render(){
        const listElements = this.props.data.map((item, index) => {
        
            

            return(
             <div key={item.id} className={this.reminderBackground(index)}>
                <div className="reminder-icon-bg">
                    <img className="reminder-icon" src={item.icon}/>
                </div>
                <div className="reminder-title" onClick={() => {}}>
                    <a className="reminder-title-link" href={item.url}>{item.title}</a>
                </div>
                {/* <div className="reminder-countdown">
                    {this.daysRemaining( item.date, item.time )}
                </div> */}
                    {/* <Popup trigger={<button className="btnList">info</button>}>
                        <div>
                            <div>
                                Notes: {item.notes}
                            </div>
                            <div>
                                <a href={item.url}>Website: {item.url}</a>
                            </div>
                        </div>
                    </Popup> */}
            </div>
        )

        });

        return(
            <div>
                <ul  className= "reminderElements">
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