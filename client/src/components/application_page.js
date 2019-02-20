import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ExistingBookmarks from './existingbookmarks';
import Reminders from './reminders';
import Nav from './navbar/nav';
import './application.css';


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
               <div className="navBarApplicationPage">
                   <Nav/>
               </div>

                <div className="replaceApplicationDiv">
                    <div className="textAreaReplacementApplicationDiv">
                        This Application Is Only Viewable In A Google Chrome Browser On A Desktop In Fullscreen. 
                        Mobile Devices Will Not Run The Dashboard.
                    </div>
                    <a href='http://localhost:3000/'><button className="homeButton">Go Home</button></a>

                </div>
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