import React, { Component } from "react";
import axios from "axios";
import { Collapse, CardBody, Card, CardHeader } from "reactstrap";

export default class ViewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { questionList: [] };
    this.onViewQuestion = this.onViewQuestion.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: 0, questionList : []};
  }

  componentDidMount() {
    this.onViewQuestion();
  }

  toggle(e) {
    let event = e.target.dataset.event;
    this.setState({
      collapse: this.state.collapse === Number(event) ? 0 : Number(event)
    });
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

  render() {
    const { questionList } = this.state;
    const { collapse } = this.state;

    return (
      <div className="container">
      <p></p>
      {questionList.map((curQuestion, index) => {
        return (
          <Card style={{ marginBottom: "1rem" }} key={index+1}>
            <CardHeader onClick={this.toggle} data-event={index+1}>
              {curQuestion.question}
            </CardHeader>
            <Collapse isOpen={collapse === index+1}>
              <CardBody>
                {curQuestion.answer}
              </CardBody>
            </Collapse>
          </Card>
        );
      })}
    </div>
    );
  }
}
