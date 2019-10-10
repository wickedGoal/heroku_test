import React, { Component } from "react";
import axios from "axios";
import ChapDisplay from "./ChapDisplay";
import BoardDisplay from "./BoardDisplay";

//Act as a container
export default class ChaptersList extends Component {
  constructor(props) {
    super(props);
    this.state = { chapters: [], checkedList:[] };
    this.onRefresh = this.onRefresh.bind(this);
    
  }
  componentDidMount() {
    this.onRefresh();
  }

  

  onRefresh = () => {
    axios
      //.get("https://kyomborr.herokuapp.com/api/kmles/")
      .all([axios.get("http://localhost:5000/api/kmles/"), axios.get("http://localhost:5000/api/checked/")])
      //.get("http://localhost:5000/api/kmles/")
      .then(axios.spread(function(kmle,check){
        this.setState({ chapters: kmle });
        //this.setState({ checkedList: check });
      }))      
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <BoardDisplay checked={this.state.checkedList}/>
        <ChapDisplay lists={this.state.chapters} refresh={this.onRefresh} />
      </div>
    );
  }
}
