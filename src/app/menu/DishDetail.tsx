import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { baseUrl } from "../../constants";
import {
  fetchComments,
} from "../../features/dish/commentSlice";
import { fetchDishes } from "../../features/dish/dishSlice";
import { Dish } from "../../types";
import { parseCommentDate } from "../../utils";
import Loading from "../common/Loading";
import NavBreadcrumb from "../common/NavBreadcrumb";
import AddCommentForm from "./AddCommentForm";

const DishDetail = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const dishIdNum = Number(dishId);

  // Use direct state access to avoid RTK slice-selector memoisation quirks
  // with parameterised selectors
  const isLoading = useAppSelector((state) => state.dishes.isLoading);
  const errMsg = useAppSelector((state) => state.dishes.error);
  const dish = useAppSelector((state) =>
    state.dishes.data.find((d) => d.id === dishIdNum)
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !dish) dispatch(fetchDishes());
  }, [isLoading, dish, dispatch]);

  if (isLoading) {
    return (
      <Container>
        <div className="row">
          <Loading />
        </div>
      </Container>
    );
  }

  if (errMsg) {
    return (
      <Container>
        <div className="row">
          <h4>{errMsg}</h4>
        </div>
      </Container>
    );
  }

  if (!dish) {
    return (
      <Container>
        <div className="row mt-4">
          <h4>Dish not found.</h4>
        </div>
      </Container>
    );
  }

  return (
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
          <Comments dishId={dish.id} />
        </div>
      </div>
    </Container>
  );
};

export default DishDetail;

const DishCard = ({ dish }: { dish: Dish }) => {
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

const Comments = ({ dishId }: { dishId: number }) => {
  // Direct state access — avoids parameterised RTK slice-selector edge cases
  const comments = useAppSelector((state) =>
    state.comments.data.filter((c) => c.dishId === dishId)
  );
  const isLoading = useAppSelector((state) => state.comments.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && comments.length === 0) dispatch(fetchComments());
  }, [isLoading, comments.length, dispatch]);

  return (
    <div className="container">
      <h4>Comments</h4>
      {isLoading ? (
        <Loading />
      ) : (
        <ul className="list-unstyled">
          {comments.map((comment, index) => (
            <li key={index} className="row mb-2">
              {comment.comment}
              <div className="mt-1">
                -- {comment.author}, {parseCommentDate(comment.date)}
              </div>
            </li>
          ))}
        </ul>
      )}
      <AddCommentForm dishId={dishId} />
    </div>
  );
};
