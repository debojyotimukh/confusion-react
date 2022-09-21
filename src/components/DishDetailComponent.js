import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  renderDish(dish) {
    if (dish != null) {
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>
              <h2>{dish.name}</h2>
            </CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    }
    return <div></div>;
  }

  renderComments(dish) {
    if (dish != null && dish.comments != null) {
      return (
        <div className="container">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {dish.comments.map((comment) => {
              return (
                <li key={comment.id} className="row mb-2">
                  {comment.comment}
                  <div className="mt-1">
                    -- {comment.author}, {this.parseCommentDate(comment.date)}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return <div></div>;
  }

  parseCommentDate(dateStr) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xm-12 col-md-5 m-1">
          {this.renderDish(this.props.dish)}
        </div>

        <div className="col-xm-12 col-md-5 m-1">
          {this.renderComments(this.props.dish)}
        </div>
      </div>
    );
  }
}

export default DishDetail;
