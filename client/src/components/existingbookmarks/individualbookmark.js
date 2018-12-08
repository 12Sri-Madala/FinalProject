import React, { Component } from 'react';

class IndividualBookmark extends Component {

    render(){

        const eachBookmarkTitle = this.props.title;
        const eachBookmarkUrl = this.props.url;

        return(
            <div className="bookmark">
                <a href={eachBookmarkUrl}>{eachBookmarkTitle}</a>
            </div>
        )
    }
}

export default IndividualBookmark;

