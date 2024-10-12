import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
} from "reactstrap";
import { baseUrl } from "../../constants";
import {
  fetchComments,
  selectCommentsByDishId,
} from "../../features/dish/commentSlice";
import { fetchDishes, selectDishById } from "../../features/dish/dishSlice";
import { parseCommentDate } from "../../utils";
import Loading from "../common/Loading";
import NavBreadcrumb from "../common/NavBreadcrumb";
import AddCommentForm from "./AddCommentForm";

const DishDetail = () => {
  const { dishId } = useParams();

  const dish = useSelector((state) => selectDishById(state, dishId));
  const isLoading = useSelector((state) => state.dishes.isLoading);
  const errMsg = useSelector((state) => state.dishes.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!dish) dispatch(fetchDishes());
  }, [dish, dispatch]);

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
        <NavBreadcrumb activeName={dish.name} />
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
          <div></div>
          <Comments dishId={dish.id} />
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

const Comments = ({ dishId }) => {
  const comments = useSelector((state) =>
    selectCommentsByDishId(state, dishId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (comments.length === 0) dispatch(fetchComments());
  }, [comments.length, dispatch]);

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
      <AddCommentForm dishId={dishId} />
    </div>
  );
};
