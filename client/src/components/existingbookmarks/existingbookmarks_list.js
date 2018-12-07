import React, { Component } from 'react';
import IndividualBookmark from './individualbookmark';
import './existingbookmarks_list.css';



class Folder extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: this.props.open
        }
    }

    toggleFolder = () => {
        this.setState({
            open: !this.state.open
        })
    }

    getContents = () => {

        return (
            this.props.children.map((item, index) => {
                if(item.children) {

                    return (

                        <Folder key={index} children={item.children} open={false} title={item.title} depth={this.props.depth+5}/>
                    )
                }
                else {
                    return (
                        <IndividualBookmark key={index} title={item.title} url={item.url}/>
                    )
                }
        })
        );
    }
    render(){
        return(
                <div className="folder" style=
                    {{marginLeft: this.props.depth+'%'}}>
                    <div className="toggle" onClick={this.toggleFolder}>
                        <i class="fas fa-folder folderIcon"></i>
                    </div>
                    <div className="title">
                        {this.props.title}
                    </div>
                        {this.state.open ? this.getContents() : ''}
                </div>
        );
    }
}

export default Folder;

