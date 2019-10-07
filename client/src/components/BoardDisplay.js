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
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
              <h3>
                KMLE Study D-
                <Countdown />
              </h3>
            </CardTitle>
            <CardText></CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default BoardDisplay;
