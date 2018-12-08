import React, { Component } from 'react';
import IndividualBookmark from './individualbookmark';
import './existingbookmarks_list.css';



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
            this.props.children.map((item, index) => {

                if(item.children) {
                    console.log('each index',index)
                    return (
                        <Folder key={index} children={item.children} open={false} title={item.title} depth={this.props.depth+10}/>
                    )
                }
                else if (this.props.depth !== 0) {
                    return (
                        <IndividualBookmark key={index} title={item.title} url={item.url}/>
                    )
                }
            })
        );
    }

    getIndividualBookmarks() {
        return (
            this.props.children.map((item, index) => {
                if (!item.children) {
                    return (
                        <IndividualBookmark key={index} title={item.title} url={item.url}/>
                    )
                }
            })
        )
    }

    render(){

        if(this.props.depth === 0){
            return (
                <div>

                    <div>{this.getContents(this.props)}</div>

                    <div>{this.getIndividualBookmarks()}</div>
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

