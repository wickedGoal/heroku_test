import React, { Component } from "react";
import axios from "axios";
import {Button, ButtonGroup} from "reactstrap";

import QuestionCardDisplay from "./QuestionCardDisplay";

export default class ViewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { questionList: [], daysPast:0 };
    this.onViewQuestion = this.onViewQuestion.bind(this);    
    this.handleDaysButtonClick = this.handleDaysButtonClick.bind(this);
  }

  componentDidMount() {
    this.onViewQuestion();
  }

  
  onViewQuestion = () => {
    axios
      .get("https://kyomborr.herokuapp.com/api/questions/")
      .then(res =>{
        this.setState({questionList: res.data});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleDaysButtonClick = (e) => {
    let event = e.target.dataset.event;
    this.setState({
      daysPast: Number(event)
    });
  }

  render() {

    return (
      <div>
        <ButtonGroup size="lg">
          <Button onClick={this.handleDaysButtonClick} data-event="1">Over 1day</Button>
          <Button onClick={this.handleDaysButtonClick} data-event="7">Over 1week</Button>
          <Button onClick={this.handleDaysButtonClick} data-event="28">Over 1month</Button>
          <Button onClick={this.handleDaysButtonClick} data-event="0">All</Button>
        </ButtonGroup>
      <QuestionCardDisplay questionList={this.state.questionList} days={this.state.daysPast}></QuestionCardDisplay>
      </div>
    );
  }
}
