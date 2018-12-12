import React, { Component } from 'react';
import IndividualBookmark from './individualbookmark';
import './existingbookmarks_list.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';



class Folder extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: this.props.open,
            folder: 'fa-folder'
        }
    }

    toggleFolder = () => {
        this.setState({
            open: !this.state.open
        })
        if (this.state.folder === 'fa-folder'){
            this.setState({
               folder: 'fa-folder-open'
            })
        }
        else{
            this.setState({
                folder: 'fa-folder'
            })
        }
    }

    getContents = () => {

        return (
            this.props.nested.map((item, index) => {

                if(!item.url) {

                    return (
                        <Folder key={index} nested={item.nested.nestedBookmarks} open={false} title={item.title} depth={this.props.depth+5}/>
                    )
                }
                else if (this.props.depth !== 0) {
                    return (
                        <IndividualBookmark key={index} title={item.title} url={item.url} favicon={item.favicon} class="allOfEachBookmarkTwo"/>
                    )
                }
            })
        );
    }

    getIndividualBookmarks() {
        return (
            this.props.nested.map((item, index) => {

                if (item.url) {
                    return (
                        <IndividualBookmark key={index} title={item.title} url={item.url} favicon={item.favicon} class="allOfEachBookmark"/>
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
                    {this.state.open ? this.getContents() : ''}
                </div>
            );
        }
    }
}

export default Folder;

