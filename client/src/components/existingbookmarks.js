import React, { Component } from 'react';
import ExistingBookmarkList from './existingbookmarks_list';
import ExistingDummyList from '../existingdummy/dummylist'


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
        console.log(this.list);
        return(
            <div>
                <ExistingBookmarkList  children={this.state.list} open={true} depth={0}/>
            </div>
        )


    }

}
 
export default ExistingBookmarks;