import React, { Component } from 'react';



class IndividualBookmark extends Component {


    render(){


        const eachBookmarkTitle = this.props.title;
        const eachBookmarkUrl = this.props.url;


        return(
            <div>
                {eachBookmarkTitle}{eachBookmarkUrl}
            </div>
        )
    }
}

export default IndividualBookmark;