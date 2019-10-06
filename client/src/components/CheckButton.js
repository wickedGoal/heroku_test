import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class CheckButton extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <ButtonDropdown
        className="float-right"
        size="sm"
        outline
        color="primary"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle caret>Do</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Check</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>View Questions</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default CheckButton;
