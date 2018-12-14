import React, { Component } from 'react';
import Folder from './Folder';
import './existingbookmarks_list.css';

class ExistingBookmarks extends Component {
    constructor(props){
        super(props);

    }

    render(){
        if (!this.props.list.length) {
            return <div>Loading...</div>
        }
        else{
            let bookmarksBar = this.props.list[0].nested.nestedBookmarks;
            let otherBookmarks = this.props.list[1].nested.nestedBookmarks;
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