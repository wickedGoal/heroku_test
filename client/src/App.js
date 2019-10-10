import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import CreateQuestion from "./components/create-question.component";
//import EditTodo from "./components/edit-todo.component";
import ChaptersList from "./components/chapters-list.component";

import logo from "./logo192.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              <img
                src={logo}
                width="30"
                height="30"
                alt="Kyomborr.herokuapp.com"
              />
            </a>
            <Link to="/" className="navbar-brand">
              For Kyom
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Checklist
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/questions" className="nav-link">
                    Questions
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={ChaptersList} />
          <Route path="/questions" component={CreateQuestion} />
        </div>
      </Router>
    );
  }
}

export default App;
