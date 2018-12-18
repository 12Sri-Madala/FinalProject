import React, { Component } from 'react';
import Folder from './Folder';
import './existingbookmarks_list.css';
import { Route, Switch} from 'react-router-dom';

class ExistingBookmarks extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookmarks: props.list
        }
    }

    componentDidMount(){
        
    }
    render(){                   
            return(
                <div className="allFolders">
                    <Switch>
                        <Route path="/application_page/:openRoute?" component={ 
                            (props) => <Folder nested={this.state.bookmarks} open={false} title="Bookmarks" depth={0} {...props}/>}/>
                        <Route path="*" component={ 
                            (props) => <Folder nested={this.state.bookmarks} open={false} title="Bookmarks" depth={0} {...props}/>}/>
                    </Switch>
                </div>
           )   
    }
}
 
export default ExistingBookmarks;