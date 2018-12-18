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
            //it will be a comma separated list, so we split it into an array
            openRoute = props.match.params.openRoute.split(',');
            //otherwise, did we get our route passed in as a property (whih would happen to the nested folders)
          } 
        else if(props.openRoute) {
            //if we did get it as props we're going to use that as our state route
            openRoute = props.openRoute;
          }
        this.state = {
            open: this.props.open,
            folder: 'fa-folder',
            openRoute: openRoute
        }
    }

    toggleFolder = () => {
        let newRoute = this.state.openRoute;

        if(newRoute[this.props.depth] === this.props.title){
            newRoute = newRoute.slice(0, this.props.depth);
          }
          //otherwise, we have clicked on a folder that isn't open yet.  Either at our current depth, or changing folders at a higher depth.  Since this.props.depth is the current depth of the folder that was clicked, we change the folder at the current level
        else {
            newRoute[this.props.depth] = this.props.title
            //then slice off everything after our current level because it belonged to the previous open folder, and is now orphaned
            newRoute = newRoute.slice(0, this.props.depth+1);
          }
          //then we push the /route/ (to distinguish this as a route) plus our array, joined together with commas
          //this will change the URL and thus change our route, which will change which folders are open
          this.props.history.push( '/application_page/'+newRoute.join(','));
        

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
    }
    checkIfOpen(){  
        //check if there is even a depth at our level yet.  probably not necessary, but better safe than sorry
        if( this.state.openRoute.length >= this.props.depth){
          //if the item at our depth that is supposed to be open has the same title as us, then we should be open!
            if(this.state.openRoute[this.props.depth] === this.props.title){
              return true
            }
        }     
        //it wasn't us that was supposed to be open, nothing to see here
        return false;
      }

    getContents = () => {

        return (
            this.props.nested.map((item, index) => {
                if(!item.url) {
                    console.log(item);
                    return (
                        <Folder key={index} nested={item.nested.nestedBookmarks} openRoute={this.state.openRoute} history={this.props.history}
                         open={false} title={item.title} depth={this.props.depth+1}/>
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
        else {
            return (
                <div className="folder" style={{marginLeft: this.props.depth + '%'}}>
                    <div className="toggle" onClick={this.toggleFolder}>
                        <i className={`fas ${this.state.folder} folderIcon`}></i>
                    </div>
                    <div className="title">
                        {this.props.title}
                    </div>
                     {/* {this.state.open ? this.getContents() : ''}  */}
                     { this.checkIfOpen() ? this.getContents() : ''}
                </div>
            );
        }
    }
}

export default Folder;

