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
    render(){ 
        
        if (!this.props.list.length){
           return(
            console.log('0 marks')
           )
        }
        else{
        return(                                     
                
          <div>hello</div>
        ) 
       }                           
    }
}
 
export default ExistingBookmarks;


{/* <div className="allFolders">
                    <Switch>
                        <Route path="/application_page/:openRoute?" component={ 
                            (props) => <Folder nested={this.state.bookmarks} open={false} title="Bookmarks" depth={0} {...props}/>}/>
                        <Route path="*" component={ 
                            (props) => <Folder nested={this.state.bookmarks} open={false} title="Bookmarks" depth={0} {...props}/>}/>
                    </Switch>
                </div> */}