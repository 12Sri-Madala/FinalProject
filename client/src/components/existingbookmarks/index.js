import React, { Component } from 'react';
import Folder from './Folder';
import './existingbookmarks_list.css';
import { Route, Switch} from 'react-router-dom';

class ExistingBookmarks extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            bookmarks: null
        }
         
    }

    componentDidUpdate(prevProps, prevState) {
        const { bookmarks } = this.state;
        const { list } = this.props;

        if (bookmarks === null && list.length) {
            this.setState({ 
                bookmarks:this.props.list 
            });
        }

        
    }

    render(){ 
        
        if (!this.state.bookmarks){
           return(
            <div className="noDataErrorFixing">
                <div className="insideNoDataErrorFixing">
                    You Do Not Have Any Bookmarks Or Reminders. 
                    Please Add Some Bookmarks Or Reminders Thru 
                    The Extension So You Can See The Dashboard In Action.
                </div>
            </div>
           )
        }
        else if (this.state.bookmarks){
            
            return(                                     
                <div className="allFolders">
                <Switch>
                    <Route path="/application_page/:openRoute?" component={ 
                            (props) => {
                                
                                return <Folder nested={this.state.bookmarks}  title="Bookmarks" depth={0} {...props}/>
                            }
                        }
                    />
                            
                    <Route path="*" component={ 
                        (props) => <Folder nested={this.state.bookmarks}  title="Bookmarks" depth={0} {...props}/>}/>
                </Switch>
            </div>     
            
            ) 
       }                         
    }
}
 
export default ExistingBookmarks;


// open={false} on both routes????


