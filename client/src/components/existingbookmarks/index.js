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
        
        if (bookmarks === null) {
            this.setState({ 
                bookmarks: list.length ? this.props.list : false
            });
        }           
    }
     

    render(){ 
        
        
        if (!this.state.bookmarks){       
           return this.state.bookmarks === false ? (
            <div  className={`${this.state.outsideDivClass}`} >
                <div  className={`${this.state.insideDivClass}`}>
                <img className={` ${this.state.insideDivClass}`} src={require(`./images/arrowPointingBookmark.png`)}/>

                    You Do Not Have Any Bookmarks Or Reminders. 
                    Please Add Some Bookmarks Or Reminders Through 
                    The Extension So You Can See The Dashboard In Action.

                </div>

            </div>
           ) : (
            
            <img className="weirdImage" src={require(`./images/ajax-loader.gif`)}/>
           )
        }
        else if (this.state.bookmarks){
            
            return(                                     
                <div className="allFolders">
                <Switch>
                    <Route path="/crease_dashboard/:openRoute?" component={ 
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


