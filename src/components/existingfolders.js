import React, { Component } from 'react';
import DummyFolders from '../existingdummy/dummyfolders';

class ExistingFolders extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            list:[]
        }
    }

    componentDidMount(){
        this.getExistingBookmarks()
    }

    getExistingBookmarks = () => {
        this.setState({
            list: DummyFolders
        });
    }

    render(){ 
        
        const dummyFolderElements = this.state.list.map((item, index) =>{
            return <li key={item._id}>{item.folder}</li>
        })

        return ( 
            <ul>
                {dummyFolderElements}
            </ul>
         );
    }
}
 
export default ExistingFolders;