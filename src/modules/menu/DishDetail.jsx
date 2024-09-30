import Loading from "../common/Loading";
import { parseCommentDate } from "../../utils";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../constants";
import { useState, useEffect } from "react";
import { getDishWithComments } from "../../services";
import AddCommentForm from "./AddCommentForm";

const DishDetail = () => {
  const { dishId } = useParams();
  const [dish, setDish] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  const dishLoaded = (data) => {
    setDish(data);
    setIsLoading(false);
  };

  const dishFailed = (errMsg) => {
    setErrMsg(errMsg);
    setIsLoading(false);
  };

  useEffect(() => {
    getDishWithComments(parseInt(dishId, 10), dishLoaded, dishFailed);
  }, [dishId]);

  return isLoading ? (
    <Container>
      <div className="row">
        <Loading />
      </div>
    </Container>
  ) : errMsg ? (
    <Container>
      <div className="row">
        <h4>{errMsg}</h4>
      </div>
    </Container>
  ) : (
    <Container>
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-xm-12 col-md-5 m-1">
          <DishCard dish={dish} />
        </div>
        <div className="col-xm-12 col-md-5 m-1">
          <Comments dishId={dish.id} dishComments={dish.comments} />
        </div>
      </div>
    </Container>
  );
};

export default DishDetail;

const DishCard = ({ dish }) => {
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
};

const Comments = ({ dishId, dishComments }) => {
  const [comments, setComments] = useState(dishComments);
  const setNewComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  return (
    <div className="container">
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {comments.map((comment, index) => {
          return (
            <li key={index} className="row mb-2">
              {comment.comment}
              <div className="mt-1">
                -- {comment.author}, {parseCommentDate(comment.date)}
              </div>
            </li>
          );
        })}
      </ul>
      <AddCommentForm dishId={dishId} updateComments={setNewComment} />
    </div>
  );
};
