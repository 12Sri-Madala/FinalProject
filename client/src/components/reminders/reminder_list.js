import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize";
import "./reminder_list.css";
import Popup from "reactjs-popup";
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/application_page'

class Reminder extends Component {
  reminderBackground = index => {
    if (index % 2 === 0) {
      return "light-reminder-background";
    }
    return "dark-reminder-background";
  };

  countDown = (date, time) => {
    var dateTime = `${date} ${time}`;
    var countdown = getTimeRemaining(dateTime);
    var dayOfWeek = new Date(dateTime).getDay();

    if (countdown.days > 7) {
      return (
        <div className="countdownAMPM">
          <p className="countdown-font">{this.timeConvert(time)}</p>
          <p className="countdown-font-dow">{this.dateConvert(date)}</p>
        </div>
      );
    } else if (countdown.days < 8 && countdown.seconds > 0) {
      return (
        <div className="countdownAMPM">
          <p className="countdown-font">{this.timeConvert(time)}</p>
          <p className="countdown-font-dow">{this.dayOfWeek(dayOfWeek)}</p>
        </div>
      );
    }
  };

  dateConvert = date => {
    var date = new Date(date);
    var month = date.getMonth() + 1;

    if (date.getMonth() + 1 < 10) {
      month = "0" + month;
    }

    return month + "/" + date.getDate() + "/" + date.getFullYear();
  };

  dayOfWeek = day => {
    var today = new Date().getDay();
    console.log(day);
    if (today === day) {
      return "Today";
    }

    switch (day) {
      case 0:
        return "Sunday";
        break;
      case 1:
        return "Monday";
        break;
      case 2:
        return "Tuesday";
        break;
      case 3:
        return "Wednesday";
        break;
      case 4:
        return "Thursday";
        break;
      case 5:
        return "Friday";
        break;
      case 6:
        return "Saturday";
        break;
    }
  };

  timeConvert = time => {
    time = time.split(":");

    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var timeConvert;

    if (hours > 0 && hours <= 12) {
      timeConvert = "" + hours;
    } else if (hours > 12) {
      timeConvert = "" + (hours - 12);
    } else if (hours == 0) {
      timeConvert = "12";
    }

    timeConvert += minutes < 10 ? ":0" + minutes : ":" + minutes;
    timeConvert += hours >= 12 ? " P.M." : " A.M.";

    return timeConvert;
  };

  titleLength = title => {
    var concatTitle = "";
    if (title.length > 66) {
      for (var i = 0; i < 65; i++) {
        concatTitle += title[i];
      }
      concatTitle += "..";
      return concatTitle;
    }
    return title;
  };

  deleteItem = async (item) => {
    console.log("reminder item that was passed in: ", item)
    await axios({
      url: `/auth/deleteBookmarks`,
      method: 'delete',
      data: {
        reminder: item
      }
    }).then( resp => {
        console.log("this is the resp from the server: ",resp)
      })
    // this.getListData();
    
}

async getListData(){
  // Call server to get data
  // http://api.reactprototypes.com/todos?key=c718_demouser
  try {
      const resp = await axios.get(BASE_URL + API_KEY);

      console.log('Server Resp:', resp);

      this.setState({
          list: resp.data.todos
      });
  } catch(err){
      // console.log('Error: ', err.message);

      this.setState({
          error: 'Error getting todos'
      });
  }
  
  // console.log('Resp: ', resp)

  // axios.get(BASE_URL + API_KEY).then((resp) => {
  //     // console.log('Server Response: ', resp);

  //     this.setState({
  //         list: resp.data.todos
  //     })
  // }).catch((err) => {
  //     console.log('Request Error: ', err.message)
  //     this.setState({
  //         error: 'Error Getting Todos'
  //     })
  // }) 

  // console.log('After axios.get call') (COMES BEFORE AXIOS CALL BECAUSE CALL HAS TO FINISH BEFORE C.LOG RUNS)
 
}

  render() {
    const listElements = this.props.data.map((item, index) => {
      return (
        <div key={item._id} className={this.reminderBackground(index)}>
          <a className="reminder-title-link" href={item.url} target="_blank">
            <div className="reminder-icon-bg">
              <img className="reminder-icon" src={item.icon} />
            </div>
          </a>
          <div className="reminder-title">
            <a className="reminder-title-link" href={item.url} target="_blank">
              {this.titleLength(item.title)}
            </a>
          </div>
          {this.countDown(item.date, item.time)}
          <Popup
            position="left center"
            trigger={<div className="reminder-dots" />}
          >
            <div>
              <div>Notes: {item.notes}</div>
              <hr />
              <div className="popup-link">Recurrence: {item.recurrence}</div>
              <div className="center delete-reminder">
                <button
                  className="btn-small red darken-3"
                  id="delete-reminder-btn"
                  onClick={() => {
                    this.deleteItem(item);
                    // this.props.delete(item);
                    console.log('DELETED: ',item);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </Popup>
        </div>
      );
    });

    return (
      <div className="outer-reminders">
        <div className="reminder-header">
          <div className="reminder-tab">
            <h6>Reminder</h6>
          </div>
        </div>
        <ul className="reminderElements">{listElements}</ul>
      </div>
    );
  }
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

export default Reminder;
