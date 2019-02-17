import React, { Component } from 'react';
import Folder from './folder';
import './existingbookmarks_list.css';
import { Route, Switch} from 'react-router-dom';

class ExistingBookmarks extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            bookmarks: null,
            outsideDivClass: 'none',
            insideDivClass: 'none'
        }
         
    }
    
    componentDidMount(){
       setTimeout(() => {
        this.setState({
            outsideDivClass: 'noDataErrorFixing',
            insideDivClass: 'insideNoDataErrorFixing'
           }) ;
       },1000)
                
            
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
        
        console.log('boook mark state', this.state.outsideDivClass);
        if (!this.state.bookmarks){       
           return(
            <div  className={`${this.state.outsideDivClass}`} >
                <div  className={`${this.state.insideDivClass}`}>
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


