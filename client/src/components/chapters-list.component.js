import React, { Component } from "react";
import axios from "axios";
import ChapDisplay from "./ChapDisplay";
import BoardDisplay from "./BoardDisplay";

//Act as a container
export default class ChaptersList extends Component {
  constructor(props) {
    super(props);
    this.state = { chapters: [] };
    this.onRefresh = this.onRefresh.bind(this);
  }
  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    axios
      .get("https://kyomborr.herokuapp.com/api/kmles/")
      //.get("http://localhost:5000/api/kmles/")
      .then(response => {
        this.setState({ chapters: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <BoardDisplay />
        <ChapDisplay lists={this.state.chapters} refresh={this.onRefresh} />
      </div>
    );
  }
}
