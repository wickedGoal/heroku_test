import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "axios";
import { runInThisContext } from "vm";

class CheckButton extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.state = {
      dropdownOpen: false,
      user_id: 1 // modify after user implementation
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  updateCheck = event => {
    const data = {
      user_id: this.state.user_id
    };
    const part_id = this.props.part_id;
    const chap_id = this.props.chap_id;
    //console.log(`https://kyomborr.herokuapp.com/` + part_id + "/" + chap_id);

    axios
      .put(
        `https://kyomborr.herokuapp.com/api/kmles/` + part_id + "/" + chap_id,
        {
          data
        }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.refresh();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <ButtonDropdown
        className="float-right"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle caret outline color="info" size="sm"></DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.updateCheck}>Check</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>View Questions</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default CheckButton;
