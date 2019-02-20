import React, { Component } from 'react';
import IndividualBookmark from './individualbookmark';
import './existingbookmarks_list.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';



class Folder extends Component {
    constructor(props){
        super(props);
        let openRoute = [];
        if(props.match && props.match.params.openRoute){
            openRoute = props.match.params.openRoute.split(',');
          } 
        else if(props.openRoute) {
            openRoute = props.openRoute;
          }
        this.state = {
            folder: props.open ? "fa-folder" : "fa-folder-open",
            openRoute: openRoute
        }
    }

    toggleFolder = () => {
        
        let newRoute = this.state.openRoute;
        
        if(newRoute[this.props.depth] === this.props.title){
            newRoute = newRoute.slice(0, this.props.depth);
            console.log('open')
          }
        else {
            newRoute[this.props.depth] = this.props.title
            newRoute = newRoute.slice(0, this.props.depth+1);
            console.log('closed')
            
          }
          this.props.history.push( '/crease_dashboard/'+newRoute.join(','));
    }
    getButtonMarker = () => {
        
        this.checkIfOpen() ? this.setState({
            folder: 'fa-folder-open'
        }) : this.setState({
            folder: 'fa-folder'
        });
    }
    checkIfOpen = () => {  
        if( this.state.openRoute.length >= this.props.depth){
            if(this.state.openRoute[this.props.depth] === this.props.title){
              return true
            }
        }           
        return false;
      }

    getContents = (open) => {
        
        return (
            this.props.nested.map((item, index) => {
                
                if(!item.url) {
                    
                    return (
                        <Folder key={index} nested={item.nested.nestedBookmarks} open={open} openRoute={this.state.openRoute} history={this.props.history}
                          title={item.title} depth={this.props.depth+1}/>
                    )

                }
                else if (this.props.depth !== 0) {

                    return (
                        <IndividualBookmark key={index} title={item.title} url={item.url} favicon={item.icon} class="allOfEachBookmarkTwo"/>
                    )
                }
            })
        );
    }

    getIndividualBookmarks() {
        return (

            this.props.nested.map((item, index) => {

                if (item.url && !item.time) {
                    return (
                        <IndividualBookmark key={index} title={item.title} url={item.url} favicon={item.icon} class="allOfEachBookmark"/>
                    )
                }
            })
        )
    }

    render(){
        
        if(this.props.depth === 0){
            
            return (
                <div>
                    <div className="folderSection">{this.getContents(this.props)}</div>
                    <hr className="hrClass"/>
                    <div className="individualFirstBookMark ">{this.getIndividualBookmarks()}</div>
                </div>
            )
        }
        

           

            else if (this.props.nested){
                
            return (
                <div className="folder" >
                    <div className="toggle" onClick={this.toggleFolder}>
                        
                        <i className={`fas ${this.state.folder} folderIcon`}></i> 
                    </div>
                    <div className="title">
                        {this.props.title}
                    </div>                   
                     { this.checkIfOpen() ? this.getContents(true) : ''}
                </div>
            );
            }
        }
}

export default Folder;


/// in THE DIV with classname Folder  style={{marginLeft: this.props.depth + '%'}}