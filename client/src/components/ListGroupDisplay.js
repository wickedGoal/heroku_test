import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class ListGroupDisplay extends Component {
  constructor(props) {
    super(props);
  }

  _renderError = () => {
    return <div>Error occurs! Please try again.</div>;
  };

  _renderPosts = () => {
    const { lists } = this.props;

    return (
      <ListGroup>
        {lists.map(curChap => {
          return (
            <ListGroupItem tag="a" href="#" action>
              {curChap.chap_id}. {curChap.chap_name}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  };

  render() {
    if (this.props.lists) {
      return this._renderPosts();
    } else {
      return this._renderError();
    }
  }
}

export default ListGroupDisplay;
