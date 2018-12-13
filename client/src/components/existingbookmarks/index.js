import React, { Component } from 'react';
import Folder from './Folder';
import './existingbookmarks_list.css';
import axios from 'axios'

class ExistingBookmarks extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: []
        }

        this.authCall = this.authCall.bind(this);
    }

    async authCall(){

        const resp = await axios.get("http://localhost:8000/auth/getBookmarks",{withCredentials: true}).then((response)=>{
            console.log('bookmarks accessed: ', response.data.bookmarks[0].nested.nestedBookmarks);
             this.setState({
                 list: response.data.bookmarks[0].nested.nestedBookmarks

             })
            console.log("right ehre buddy",this.state.list)
        });

    }
    componentDidMount(){
        this.authCall();

    }

    render(){

        if (!this.state.list.length) {
            return <div>Loading...</div>
        }
        else{
            console.log('RIGHT HERE',this.state.list)
            let bookmarksBar = this.state.list[0].nested.nestedBookmarks;
            let otherBookmarks = this.state.list[1].nested.nestedBookmarks;
            let combinedBookmarks = [...bookmarksBar, ...otherBookmarks];

            return(
                <div>
                    <div className="allFolders">
                        <Folder nested={combinedBookmarks} open={false} depth={0}/>
                    </div>
                </div>
            )
        }
    }
}
 
export default ExistingBookmarks;