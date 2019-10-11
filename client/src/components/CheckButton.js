import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

  //for question posting modal
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
import axios from "axios";

class CheckButton extends Component {
  constructor(props) {
    super(props);

    this.dropdown_toggle = this.dropdown_toggle.bind(this);
    this.updateCheck = this.updateCheck.bind(this);

    this.modal_toggle = this.modal_toggle.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);

    this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
    this.handleChangeAnswer = this.handleChangeAnswer.bind(this);

    this.state = {
      dropdownOpen: false,
      user_id: 1, // modify after user implementation

      //state for question modal
      modal: false,

      //state for question/answer state
      question: "",
      answer: ""
    };
  }

  dropdown_toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  modal_toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  //function for updating db that we have checked the chapter using axios
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

  updateQuestion = event => {
    const data = {
      question: this.state.question,
      answer: this.state.answer,
      part_id: this.props.part_id,
      chap_id: this.props.chap_id,
      comment1: "",
      comment2: "",
      logs: { user_id: this.state.user_id }
    };
    //const part_id = this.props.part_id;
    //const chap_id = this.props.chap_id;
    //console.log(`https://kyomborr.herokuapp.com/` + part_id + "/" + chap_id);
    console.log(data);

    axios
      .post(
        `https://kyomborr.herokuapp.com/api/questions`,
        {
          data
        },
        { headers: { "Content-type": "application/json" } }
      )
      .then(res => {
        console.log(res.data);
        //this.props.refresh();

        //to disappear modal
        this.modal_toggle();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChangeQuestion(event) {
    this.setState({ question: event.target.value });
  }
  handleChangeAnswer(event) {
    this.setState({ answer: event.target.value });
  }

  render() {
    return (
      <Dropdown
        className="float-right"
        direction="left"
        isOpen={this.state.dropdownOpen}
        toggle={this.dropdown_toggle}
      >
        <DropdownToggle caret outline color="info" size="sm"></DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.updateCheck}>Check</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.modal_toggle}>
            Add a Question
          </DropdownItem>

          <Modal
            isOpen={this.state.modal}
            toggle={this.modal_toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.modal_toggle}>
              Add a question - {this.props.chap_name}
            </ModalHeader>
            <ModalBody>
              <Input
                type="textarea"
                placeholder="Question"
                rows={2}
                onChange={this.handleChangeQuestion}
              />
              <Input
                type="textarea"
                placeholder="Answer"
                rows={5}
                onChange={this.handleChangeAnswer}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateQuestion}>
                Submit
              </Button>{" "}
              <Button color="secondary" onClick={this.modal_toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default CheckButton;
