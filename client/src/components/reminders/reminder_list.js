import React, { Component } from 'react';
import './reminder_list.css';
import Popup from "reactjs-popup";
import dots from './images/reminder-dots.png';


class Reminder extends Component {

    reminderBackground = (index) => {
        if ( index%2 === 0 ){
            return 'light-reminder-background';
        }
        return 'dark-reminder-background';
    }

    countDown = ( date, time ) => {
        var dateTime = `${date} ${time}`;
        var countdown = getTimeRemaining( dateTime );
    
        if ( countdown.days > 0){
            return (
                <div  className="countdown">
                    <p className="countdown-font">{`${countdown.hours} H`}</p>
                    <p className="countdown-font">{`${countdown.days} D`}</p>
                </div>
            );
        } else if ( countdown.days === 0 && countdown.hours > 11 ){
            return (
                <div  className="countdown" id="reminder-time-hours">
                    <p className="countdown-font">{`${countdown.hours} H`}</p>
                </div>
            );
        } else if ( countdown.days === 0 && countdown.hours < 12){
            return this.timeConvert( time )
        }
    }

    timeConvert = ( time ) => {
        time = time.split(':'); 

        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var timeConvert;

        if (hours > 0 && hours <= 12) {
            timeConvert= "" + hours;
        } else if (hours > 12) {
            timeConvert= "" + (hours - 12);
        } else if (hours == 0) {
            timeConvert= "12";
        }
        
        timeConvert += (minutes < 10) ? ":0" + minutes : ":" + minutes; 

        if (hours >= 12) {
            return (
                <div  className="countdownAMPM">
                    <p className="countdown-font" id="amPM">{ `P.M.` }</p>
                    <p className="countdown-font">{ timeConvert }</p>
                </div>
            );
        } else {
            return (
                <div  className="countdownAMPM">
                    <p className="countdown-font" id="amPM">{ `A.M.` }</p>
                    <p className="countdown-font">{ timeConvert }</p>
                </div>
            );
        }
    }

    titleLength = (title) => {
        var concatTitle = '';
        if(title.length > 71){
            for (var i=0; i<70; i++){
                concatTitle += title[i];
            }
            concatTitle += ".."
            return concatTitle
        } 
        return title;
    }

    render(){
        const listElements = this.props.data.map((item, index) => {
        
            

            return(
             <div key={item.id} className={this.reminderBackground(index)}>
                <div className="reminder-icon-bg">
                    <img className="reminder-icon" src={item.icon}/>
                </div>
                <div className="reminder-title" onClick={() => {}}>
                    <a className="reminder-title-link" href={item.url}>{this.titleLength(item.title)}</a>
                </div>
                    {this.countDown( item.date, item.time )}
                <Popup trigger={<div className="reminder-dots"></div>}>
                    <div>
                        <div>
                            Notes: {item.notes}
                        </div>
                        <hr />
                        <div className="popup-link">
                            <a href={item.url}>{item.url}</a>
                        </div>
                    </div>
                </Popup>
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
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
    };
}

export default Reminder;