import React, { Component } from 'react';
import ExistingBookmarkList from './existingbookmarks_list';
import ExistingDummyList from '../../existingdummy/dummylist'


class ExistingBookmarks extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: ExistingDummyList
        }
    }

    // componentDidMount(){
    //     this.getExistingBookmarks()
    //
    // }
    //
    // getExistingBookmarks(){
    //     this.setState({
    //         list: ExistingDummyList
    //     });
    // }

    render(){
        console.log("YERBA MATE", this.state.list[0].children)

        /*const newerList = newList.map(() => {

        })*/
        return(
            <div>
                <ExistingBookmarkList  children={this.state.list[0].children} open={false} depth={0}/>
            </div>
        )


    }

}
 
export default ExistingBookmarks;