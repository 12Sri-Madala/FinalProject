import React, { Component } from 'react';
import Folder from './folder';
import './existingbookmarks_list.css';
import { Route, Switch} from 'react-router-dom';

class ExistingBookmarks extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            bookmarks: null,
            noBookmarks: 'none'
        }
         
    }
    componentDidMount(){
        setTimeout(this.addMissingBookmarkMessage, 3000);
    };

    componentDidUpdate(prevProps, prevState) {
        const { bookmarks } = this.state;
        const { list } = this.props;

        if (bookmarks === null && list.length) {
            this.setState({ 
                bookmarks:this.props.list 
            });
        }           
    }
    addMissingBookmarkMessage = () => {
        this.setState({noBookmarks: 'block'})
    }

    render(){ 
        
        if (!this.state.bookmarks){
           return(
            <div className="noDataErrorFixing" style ={{display: `${this.noBookmarks}`}}>
                <div style ={{display: `${this.noBookmarks}`}} className='insideNoDataErrorFixing'>
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


