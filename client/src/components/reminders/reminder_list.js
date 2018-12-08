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
        var dayOfWeek = new Date(dateTime).getDay();
        
        if ( countdown.days > 7){
            return (
                <div  className="countdownAMPM">
                    <p className="countdown-font">{ this.timeConvert( time ) }</p>
                    <p className="countdown-font">{ date }</p>
                </div>
            );
        } else if ( countdown.days < 8){
            return (
                <div  className="countdownAMPM">
                    <p className="countdown-font">{ this.timeConvert( time ) }</p>
                    <p className="countdown-font">{ this.dayOfWeek( dayOfWeek ) }</p>
                </div>
            );
        } else if ( countdown.days === 0 && countdown.hours < 24 ){
            return (
                <div  className="countdownAMPM">
                    <p className="countdown-font">{ this.timeConvert( time ) }</p>
                </div>
            );
        }
    }

    dayOfWeek = ( day ) => {
        var today = new Date().getDay();
        
        if ( today === day ){
            return 'Today';
        }

        switch (day){
            case 0:
                return 'SUN';
                break;
            case 1:
                return 'MON';
                break;
            case 2:
                return 'TUES';
                break;
            case 3:
                return 'WED';
                break;
            case 4:
                return 'THUR';
                break;
            case 5:
                return 'FRI';
                break;
            case 6:
                return 'SAT';
                break;
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
        timeConvert += (hours >= 12) ? " P.M." : " A.M."; 

        return timeConvert;
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
                <div className="reminder-header">
                    <h3>Reminders</h3>
                </div>
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