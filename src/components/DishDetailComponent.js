/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
  Label,
  Button,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const RenderDish = ({ dish }) => {
  if (dish != null) {
    return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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

const RenderComments = ({ comments, postComment, dishId }) => {
  if (comments != null) {
    return (
      <div className="container">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => {
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
        <CommentForm dishId={dishId} postComment={postComment} />
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
  if (props.isLoading) {
    return (
      <Container>
        <div className="row">
          <Loading />
        </div>
      </Container>
    );
  }
  if (props.errMsg) {
    return (
      <Container>
        <div className="row">
          <h4>{props.dishesErrMsg}</h4>
        </div>
      </Container>
    );
  }
  if (props.dish != null) {
    return (
      <Container>
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-xm-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-xm-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </Container>
    );
  }
};

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
    this.toggleModal();
    console.log("Current state: " + JSON.stringify(values));
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.name,
      values.comment
    );
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"> Submit Comment</span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <FormGroup row>
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    placeholder="Rating"
                    default="1"
                    className="form-control"
                  >
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                  </Control.select>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="name" md={4}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be at least 3 characters ",
                      maxLength: "Must be 15 characters or less ",
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="comment" md={2}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 10 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DishDetail;
