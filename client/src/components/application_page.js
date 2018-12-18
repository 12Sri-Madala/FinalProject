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

    async authCall(){
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
        console.log('application page props', this.state.combinedBookmarks)
        return (
            <Fragment>
                <Nav />
                     <div className="applicationDiv">


                <div className="reminder-section">

                    <Reminders list={this.state.reminders} />
                </div>

                <div className="insideDiv rightDivApp">

                   <ExistingBookmarks list={this.state.combinedBookmarks} />

                </div>

            </div>
            </Fragment>
        );
    }
}

export default ApplicationPage;