import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from 'axios';


class CheckButton extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      user_id: 1    // modify after user implementation
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  handleClick = event => {
    const data = {
      user_id: this.state.user_id
    };
    const part_id = this.props.part_id;
    const chap_id = this.props.chap_id;

    axios.put(`https://kyomborr.herokuapp.com/`+ part_id + '/' + chap_id, { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  render() {
    return (
      <ButtonDropdown
        className="float-right"
        
        
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle caret outline color="info" size="sm"></DropdownToggle>
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
