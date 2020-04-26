import React, { Component } from "react";
//Input: liked:boolean
//Output: events. onClick
//add cursor pointer style
//it could be used as as an stateless functional component since it has no state

class Like extends Component {
  state = {};
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";

    return (
      <i
        className={classes}
        aria-hidden="true"
        onClick={this.props.onClicked}
        style={{ cursor: "pointer" }}
      ></i>
    );
  }
}

export default Like;
