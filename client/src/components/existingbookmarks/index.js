import React, { Component } from 'react';
import Folder from './Folder';
import ExistingDummyList from '../../existingdummy/dummylist';
import './existingbookmarks_list.css';


class ExistingBookmarks extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: ExistingDummyList
        }
    }
    render(){
        return(
            <div>
                <div className="allFolders">
                    <Folder children={this.state.list[0].children[0].children} open={false} depth={0}/>
                </div>
            </div>
        )
    }

}
 
export default ExistingBookmarks;