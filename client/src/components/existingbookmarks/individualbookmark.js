import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize";

class IndividualBookmark extends Component {
  render() {
    const eachBookmarkTitle = this.props.title;
    const eachBookmarkUrl = this.props.url;
    const eachFavicon = this.props.favicon;
    const classIndividualFolder = this.props.class;

    return (
      <div className={`${classIndividualFolder}`}>
        <div className={`${classIndividualFolder}`}>
          <a href={eachBookmarkUrl} target="_blank">
            <img className="individualBookmarkImg" src={eachFavicon} />
          </a>
        </div>
        <a
          className={`bookmark ${classIndividualFolder}`}
          href={eachBookmarkUrl}
          target="_blank"
        >
          {eachBookmarkTitle}
        </a>
      </div>
    );
  }
}

export default IndividualBookmark;
