import React, { Component } from 'react';
import IndividualBookmark from './individualbookmark'

class Folder extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: this.props.open
        }
    }

    toggleFolder = () => {
        this.setState({
            open: this.state.open
        })
    }

    getContents = () => {

        return (
            this.props.children.map((item, index) => {
                if(item.children) {
                    console.log("HEY BABY", item.title)
                    return (

                        <Folder key={index} children={item.children} open={false} title={item.title} depth={this.props.depth+1}/>
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
                <div className="folder" onClick={this.toggleFolder}>
                    {this.getContents()}

                </div>
        );
    }
}
export default Folder;

