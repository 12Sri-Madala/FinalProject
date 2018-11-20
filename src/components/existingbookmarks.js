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
        this.getExistingBookmarks()
    }
    
    getExistingBookmarks = () => {
        this.setState({
            list: DummyList
        });
    }

    render(){ 

        const dummyListElements = this.state.list.map((item, index) => {
            return <li key={item._id}>{item.title}, {item.URL}</li>;
        })

        return ( 
            <ul>
                <li> {dummyListElements} </li>
            </ul>
         );
    }
}
 
export default ExistingBookmarks;