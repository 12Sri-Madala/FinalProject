import React, { Component } from 'react';
import Folder from './Folder';
import ExistingDummyList from '../../existingdummy/dummylist';
import './existingbookmarks_list.css';
import axios from 'axios'

class ExistingBookmarks extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: ExistingDummyList
        }
        this.authCall = this.authCall.bind(this);
    }

    async authCall(){

        const resp = await axios.get("http://localhost:8000/auth/getBookmarks",{withCredentials: true}).then((response)=>{
            console.log('bookmarks accessed: ', response.data.data);
             this.setState({
                 list: response.data.data
             })
        });
        console.log('HEYYYYY',resp)
    }

    render(){
        return(
            <div>
                <div className="allFolders">
                    <button onClick={this.authCall}>click me you fool</button>
                    <Folder children={this.state.list[0].children[0].children} open={false} depth={0}/>
                </div>
            </div>
        )
    }

}
 
export default ExistingBookmarks;