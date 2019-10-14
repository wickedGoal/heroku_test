import React, { Component } from "react";
import { CardHeader, CardBody, Card, Collapse } from "reactstrap";
import Moment from "react-moment";

class QuestionCardDisplay extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleQuestionShow = this.toggleQuestionShow.bind(this);
    this.state = { collapse: 0};
  }

  
  toggle(e) {
    let event = e.target.dataset.event;
    this.setState({
      collapse: this.state.collapse === Number(event) ? 0 : Number(event)
    });
  }

  toggleQuestionShow(dateStr) {
    if(this.props.days === 0)
        return true;
    let logDate = new Date(dateStr);
    let nowDate = new Date();
    //console.log(logDate);
    //console.log(nowDate);
    let diffTime = Math.abs(logDate-nowDate);
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    if(diffDays <= this.props.days)
        return true;
    
    return false;
}


  renderBoard = () => {
   
    const { questionList } = this.props;
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
                <div className="float-right">{curQuestion.logs.length ? (<Moment format="YY/MM/DD">{curQuestion.logs[0].log_time}</Moment>) : ""}</div>                
              </CardBody>
            </Collapse>
          </Card>
        );
      })}
    </div>
    );
  };

  render() {
    return this.renderBoard();
  }
}

export default QuestionCardDisplay;
