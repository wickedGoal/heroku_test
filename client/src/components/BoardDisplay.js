import React, { Component } from "react";
import { CardTitle, CardText, CardBody, Card } from "reactstrap";

function Countdown() {
  var Dday = new Date(2020, 1, 3); // D-day(2017년 8월 30일)를 셋팅한다.
  var now = new Date(); // 현재(오늘) 날짜를 받아온다.

  var gap = Dday.getTime() - now.getTime(); // 현재 날짜에서 D-day의 차이를 구한다.
  var result = Math.floor(gap / (1000 * 60 * 60 * 24)); // gap을 일(밀리초 * 초 * 분 * 시간)로 나눈다. 이 때 -1 을 곱해야 날짜차이가 맞게 나온다.

  return result;
}

class BoardDisplay extends Component {
  constructor(props) {
    super(props);
  }

  renderBoard = () => {
    const { checked } = this.props;
    // let remain = <Countdown />;
    let rem = Countdown();

    //let str = Object.keys(checked).map((key) =>{
    //      return <div>{key} : {checked.list[key]}></div>;
    //}   );
    let str = JSON.stringify(checked.List);
    //let strFil = str.replace("[{", "");
    let chapToStudy = Math.ceil(checked.Remaining / rem);
    //console.log(parseInt(checked.Remaining));
    //console.log(parseInt(remain));

    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle className="heading">
              <h3>
                KMLE Study D-
                {rem}
              </h3>
            </CardTitle>
            <CardText>
              <div>{str}</div>
              <p></p>
              
              <p></p>
              <div>
                <strong>{checked.Checked} / {checked.Total}</strong> chapters checked
              </div>
              <p></p>
              <div>{chapToStudy} chapters to study per day</div>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  };

  render() {
    return this.renderBoard();
  }
}

export default BoardDisplay;
