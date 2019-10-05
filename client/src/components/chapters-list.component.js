import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ChapDisplay from "./ChapDisplay";

const Chapter = props => (
  <tr>
    <td>{props.chap.PartName}</td>
    <td>{props.chap.ChapName}</td>
    <td>{props.chap.Part}</td>
    <td>{props.chap.Chapter}</td>
  </tr>
);

//Act as a container
export default class ChaptersList extends Component {
  constructor(props) {
    super(props);
    this.state = { chapters: [] };
  }
  componentDidMount() {
    axios
      .get("https://kyomborr.herokuapp.com/api/kmles/")
      .then(response => {
        this.setState({ chapters: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  chapterList() {
    return this.state.chapters.map(function(currentChapter, i) {
      return <Chapter chap={currentChapter} key={i} />;
    });
  }

  render() {
    return (
      <ChapDisplay lists={this.state.chapters} />

      /*
    <div>
        <h3> Checklist </h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Part</th>
              <th>Chapter</th>
              <th>PartNum</th>
              <th>ChapterNum</th>
            </tr>
          </thead>
          <tbody>{this.chapterList()}</tbody>
        </table>

        <p>Welcome to Todos List Component!!</p>
      </div>
      */
    );
  }
}
