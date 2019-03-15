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
                    <p className="extensionRedirectText extensionRedirectTitle">OOPS! LETS FIGURE OUT WHY THE DASHBOARD IS NOT LOADING.</p>  
                    <p className="extensionRedirectText redirectNumbers">1</p>
                    <p className="extensionRedirectText redirectTextOne">You do not have the extension. Please click on the button 
                        below to be redirected to the Chrome Store</p>

                <div className=" meet-team-container meetTheTeamButton">
                    <a href='https://chrome.google.com/webstore/detail/crease/nbodlocfffccgkpmcnjbfobeigaajhbn'><button className="extensionButtonDashboardPage team-button">DOWNLOAD</button></a>
                </div>
                <img className={`imgExtensionPlaceholder ${this.state.insideDivClass}`} src={require(`./images/creaseExtensionPic.png`)}/>
                    
                    <p className="extensionRedirectText orText">-OR-</p>
                    <p className="extensionRedirectText redirectNumbers">2</p>
                    You do not have any bookmarks. 
                    Please add some bookmarks so you can see the dashboard in action.
                    <img className={` ${this.state.insideDivClass}`} src={require(`./images/arrowPointingBookmark.png`)}/>

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


