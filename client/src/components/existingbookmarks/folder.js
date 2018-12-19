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
            open: props.open,
            folder: 'fa-folder',
            openRoute: openRoute
        }
    }

    toggleFolder = () => {
        console.log('folders props are here',this.props)
        let newRoute = this.state.openRoute;

        if(newRoute[this.props.depth] === this.props.title){
            newRoute = newRoute.slice(0, this.props.depth);
          }
        else {
            newRoute[this.props.depth] = this.props.title
            newRoute = newRoute.slice(0, this.props.depth+1);
          }
          this.props.history.push( '/application_page/'+newRoute.join(','));
    }
    getButtonMarker = () => {
        // this.setState({
        //     open: !this.state.open
        // })
        // if (this.state.folder === 'fa-folder'){
        //     this.setState({
        //        folder: 'fa-folder-open'
        //     })
        // }
        // else{
        //     this.setState({
        //         folder: 'fa-folder'
        //     })
        // }
        
        return  this.checkIfOpen() ? '-' : 'V';
    }
    checkIfOpen = () => {  
        if( this.state.openRoute.length >= this.props.depth){
            if(this.state.openRoute[this.props.depth] === this.props.title){
              return true
            }
        }           
        return false;
      }

    getContents = () => {
        
        return (
            this.props.nested.map((item, index) => {
                
                if(!item.url) {
                    
                    return (
                        <Folder key={index} nested={item.nested.nestedBookmarks} open={false} openRoute={this.state.openRoute} history={this.props.history}
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
        
        // if(this.props.depth === 0){
            
        //     return (
        //         <div>
        //             <div className="folderSection">{this.getContents(this.props)}</div>
        //             <hr className="hrClass"/>
        //             <div className="individualFirstBookMark ">{this.getIndividualBookmarks()}</div>
        //         </div>
        //     )
        // }
        // else {

            if(!this.props.nested){
                return <div>Loading...</div>
            }

            else if (this.props.nested){
                console.log('hey THIS IS IT', this.props.nested)
            return (
                <div className="folder" style={{marginLeft: this.props.depth + '%'}}>
                    <div className="toggle" onClick={this.toggleFolder}>
                        {this.getButtonMarker()}
                        <i className={`fas ${this.state.folder} folderIcon`}></i> 
                    </div>
                    <div className="title">
                        {this.props.title}
                    </div>                   
                     { this.checkIfOpen() ? this.getContents() : ''}
                </div>
            );
            }
        }
    //}
}

export default Folder;

// open={false} for the folder
//  {/* {this.state.open ? this.getContents() : ''}  */}