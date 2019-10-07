import React, { Component } from "react";
import { ListGroup, ListGroupItem, Badge, Tooltip } from "reactstrap";

import CheckButton from "./CheckButton";

class ListGroupDisplay extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  _renderError = () => {
    return <div>Error occurs! Please try again.</div>;
  };

  _renderPosts = () => {
    const { lists } = this.props;
    const { cur_part } = this.props;
    const { refresh } = this.props;

    return (
      <ListGroup>
        {lists.map(curChap => {
          return (
            <ListGroupItem className="justify-content-between">
              {curChap.chap_id}. {curChap.chap_name}{" "}
              {curChap.logs.length > 0 && (
                <span>
                  <Badge color="info">{curChap.logs.length}</Badge>
                </span>
              )}
              <span>
                <CheckButton
                  part_id={cur_part}
                  chap_id={curChap.chap_id}
                  refresh={refresh}
                />
              </span>
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