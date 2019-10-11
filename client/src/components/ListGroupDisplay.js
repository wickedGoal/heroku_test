import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Popover,
  PopoverBody
} from "reactstrap";
import moment from "moment"

import CheckButton from "./CheckButton";

class ListGroupDisplay extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this._getTimeString = this._getTimeString.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  _renderError = () => {
    return <div>Error occurs! Please try again.</div>;
  };

  _getTimeString = (str) => {
    return moment(str, "YY/MM/DD HH:mm");
  }

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
                  <Badge
                    color="info"
                    id={"badge" + cur_part + "-" + curChap.chap_id}
                    //alt={curChap.logs.map(log => {
                    //  return log.log_time;
                    //})}
                  >
                    {curChap.logs.length}
                  </Badge>
                  <Popover
                    placement="right"
                    trigger="legacy"
                    isOpen={this.state.popoverOpen}
                    target={"badge" + cur_part + "-" + curChap.chap_id}
                    toggle={this.toggle}
                  >
                    <PopoverBody>
                      {curChap.logs.map(log => {
                        return log.log_time;
                      })}
                    </PopoverBody>
                  </Popover>
                </span>
              )}
              <span>
                <CheckButton
                  part_id={cur_part}
                  chap_id={curChap.chap_id}
                  chap_name={curChap.chap_name}
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
