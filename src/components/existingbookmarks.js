import React, { Component } from 'react';
import DummyList from '../existingdummy/dummylist';

class ExistingBookmarks extends Component {
    
    getListData () {

    }
    render(){ 
        console.log(DummyList);
        return ( 
            <ul>
                <li> Existing Bookmarks WOOOW</li>
            </ul>
         );
    }
}
 
export default ExistingBookmarks;