import React, { Component } from 'react';
import DummyList from '../existingdummy/dummylist';

class ExistingBookmarks extends Component {

    constructor(props){
        super(props);

        this.state = {
            list:[]
        }
    }

    componentDidMount(){
        this.getListData();
    }
    
    getListData = () => {
        this.setState({
            list: DummyList
        });
    }

    render(){ 
        console.log(this.state.list);

        const dummyListElements = this.state.list.map((item, index) => {
            return <li key={item._id}>{item.title}</li>;
        })

        return ( 
            <ul>
                {dummyListElements}
            </ul>
         );
    }
}
 
export default ExistingBookmarks;