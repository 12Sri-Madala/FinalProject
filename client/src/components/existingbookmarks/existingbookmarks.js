import React, { Component } from 'react';
import ExistingBookmarkList from './existingbookmarks_list';
import ExistingDummyList from '../../existingdummy/dummylist'


class ExistingBookmarks extends Component {
    constructor(props){
        super(props);

        this.state = {
            list:[]
        }
    }

    componentDidMount(){
        this.getExistingBookmarks()
    }
    
    getExistingBookmarks(){
        this.setState({
            list: ExistingDummyList
        });
    }

    render(){
        return(
            <div>My Bookmarks
                <ExistingBookmarkList  children={this.state.list} open={false} depth={0}/>
            </div>
        )


    }

}
 
export default ExistingBookmarks;