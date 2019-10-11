import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export default class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      q_Question: "",
      q_Answer: "",
      q_Part: null,
      q_Chapter: null,
      q_Comment1: "",
      q_Comment2: "",
      q_Logs: ""
    };
  }

  onChangeQuestion(e) {
    this.setState({
      q_Question: e.target.value
    });
  }
  onChangeAnswer(e) {
    this.setState({
      q_Answer: e.target.value
    });
  }
  /*
  onChangeTodoResponsible(e) {
    this.setState({
      todo_responsible: e.target.value
    });
  }

  onChangeTodoPriority(e) {
    this.setState({
      todo_priority: e.target.value
    });
  }
*/
  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Question: ${this.state.q_Question}`);
    console.log(`Answer: ${this.state.q_Answer}`);

    const newQuestion = {
      question: this.state.q_Question,
      answer: this.state.q_Answer,
      part_id: this.state.q_Part,
      chap_id: this.state.q_Chapter,
      comment1: this.state.q_Comment1,
      comment2: this.state.q_Comment2,
      logs: { user_id: 1 } // userId needs to be edited with props
    };

    axios
      .post("http://localhost:4000/todos/add", newQuestion)
      .then(res => console.log(res.data));

    this.setState({
      q_Question: "",
      q_Answer: "",
      q_Part: null,
      q_Chapter: null,
      q_Comment1: "",
      q_Comment2: "",
      q_Logs: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Question</h3>

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="questionText">Question</Label>
            <Input type="textarea" name="text" id="questionText" />
          </FormGroup>
          <FormGroup>
            <Label for="answerText">Answer</Label>
            <Input type="textarea" name="text" id="answerText" />
          </FormGroup>

          <FormGroup>
            <Label for="partSelect">Select Part</Label>
            <Input type="select" name="select" id="partSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="chapterSelect">Select Chapter</Label>
            <Input type="select" name="select" id="chapterSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>

          <FormGroup tag="fieldset">
            <legend>Radio Buttons</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> Don't know
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> Got it wrong
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> Not decided
              </Label>
            </FormGroup>
          </FormGroup>

          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
