import { useEffect, useMemo } from "react";
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
import { fetchComments, makeSelectCommentsByDishId } from "../../features/dish/commentSlice";
import { fetchDishes, makeSelectDishById } from "../../features/dish/dishSlice";
import { Dish } from "../../types";
import { parseCommentDate } from "../../utils";
import Loading from "../common/Loading";
import NavBreadcrumb from "../common/NavBreadcrumb";
import AddCommentForm from "./AddCommentForm";

const DishDetail = () => {
  // dishId from URL is always a string; json-server v1 also returns id as string
  const { dishId } = useParams<{ dishId: string }>();

  // Create one memoised selector instance per dishId value
  const selectDish = useMemo(() => makeSelectDishById(dishId ?? ""), [dishId]);

  const dishesLoaded = useAppSelector((state) => state.dishes.data.length > 0);
  const isLoading = useAppSelector((state) => state.dishes.isLoading);
  const errMsg = useAppSelector((state) => state.dishes.error);
  const dish = useAppSelector(selectDish);

  const dispatch = useAppDispatch();

  // Gate on whether ANY dishes have been fetched — same pattern as Menu.tsx.
  // Gating on !dish would loop forever when a dish is genuinely absent.
  useEffect(() => {
    if (!dishesLoaded) dispatch(fetchDishes());
  }, [dishesLoaded, dispatch]);

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
          <Comments dishId={String(dish.id)} />
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

const Comments = ({ dishId }: { dishId: string }) => {
  // One memoised selector instance per dishId — filter() always creates a
  // new array so memoisation is critical to prevent spurious re-renders.
  const selectComments = useMemo(
    () => makeSelectCommentsByDishId(dishId),
    [dishId]
  );

  const comments = useAppSelector(selectComments);
  // Gate on total loaded comments, NOT on this dish's comment count.
  // A dish with zero comments would otherwise trigger an infinite fetch loop.
  const commentsLoaded = useAppSelector(
    (state) => state.comments.data.length > 0
  );
  const isLoading = useAppSelector((state) => state.comments.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!commentsLoaded) dispatch(fetchComments());
  }, [commentsLoaded, dispatch]);

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
