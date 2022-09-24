import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

const RenderDish = ({ dish }) => {
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
};

const RenderComments = ({ dish }) => {
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
                  -- {comment.author}, {parseCommentDate(comment.date)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return <div></div>;
};

const parseCommentDate = (dateStr) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let date = new Date(dateStr);
  return date.toLocaleDateString("en-US", options);
};

const DishDetail = (props) => {
  return (
    <div className="row">
      <div className="col-xm-12 col-md-5 m-1">
        <RenderDish dish={props.dish} />
      </div>
      <div className="col-xm-12 col-md-5 m-1">
        <RenderComments dish={props.dish} />
      </div>
    </div>
  );
};

export default DishDetail;
