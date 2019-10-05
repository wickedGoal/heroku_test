import React, { Component } from "react";
import { Collapse, CardBody, Card, CardHeader } from "reactstrap";

class ChapDisplay extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: 0, cards: [1, 2, 3, 4, 5] };
  }

  toggle(e) {
    let event = e.target.dataset.event;
    this.setState({
      collapse: this.state.collapse === Number(event) ? 0 : Number(event)
    });
  }

  _renderError = () => {
    return <div>Error occurs! Please try again.</div>;
  };

  _renderPosts = () => {
    const { lists } = this.props;
    const { cards, collapse } = this.state;
    //return posts.map(post => <div key={post.id}>{post.title}</div>);
    return (
      <div className="container">
        <h3 className="page-header">KMLE Chapters</h3>
        {cards.map(index => {
          return (
            <Card style={{ marginBottom: "1rem" }} key={index}>
              <CardHeader onClick={this.toggle} data-event={index}>
                Header{index}
              </CardHeader>
              <Collapse isOpen={collapse === index}>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Collapse>
            </Card>
          );
        })}
      </div>
    );
  };

  render() {
    if (this.props.lists) {
      return this._renderPosts();
    } else {
      return this._renderError();
    }
  }
}

export default ChapDisplay;
