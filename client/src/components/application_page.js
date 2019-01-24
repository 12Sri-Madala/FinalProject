import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ExistingBookmarks from './existingbookmarks';
import Reminders from './reminders';
import Nav from './navbar/nav';
import './application.css';

import { Route, Switch} from 'react-router-dom';



class ApplicationPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            reminders: [],
            combinedBookmarks: []
        };
    }

    componentDidMount(){
        this.authCall();
    }

    authCall = async () => {
        const response = await axios.get("http://localhost:8000/auth/getBookmarks",{
            withCredentials: true
        });

        const { reminders, bookmarks: bookmarkRoot } = response.data;
        const bookmarks = bookmarkRoot[0].nested.nestedBookmarks;
        let bookmarksBar = bookmarks[0].nested.nestedBookmarks;
        let otherBookmarks = bookmarks[1].nested.nestedBookmarks;
        const combinedBookmarks = [...bookmarksBar, ...otherBookmarks];      
        this.setState({ reminders, combinedBookmarks });
    }

    render(){
        return (
            <Fragment>
                <Nav />
             <div className="applicationDiv">


                <div className="reminder-section">

                    <Reminders updateReminders={this.authCall} list={this.state.reminders} />
                </div>

                <div className="rightDivApp">

                   <ExistingBookmarks list={this.state.combinedBookmarks} />

                </div>

            </div>
            </Fragment>
        );
    }
}

export default ApplicationPage;