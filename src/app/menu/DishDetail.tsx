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
import { fetchComments } from "../../features/dish/commentSlice";
import { fetchDishes } from "../../features/dish/dishSlice";
import { Dish } from "../../types";
import { parseCommentDate } from "../../utils";
import Loading from "../common/Loading";
import NavBreadcrumb from "../common/NavBreadcrumb";
import AddCommentForm from "./AddCommentForm";

const DishDetail = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const dishIdNum = Number(dishId);

  const dishesLoaded = useAppSelector((state) => state.dishes.data.length > 0);
  const isLoading = useAppSelector((state) => state.dishes.isLoading);
  const errMsg = useAppSelector((state) => state.dishes.error);
  const dish = useAppSelector((state) =>
    state.dishes.data.find((d) => d.id === dishIdNum)
  );

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
  // Filter comments for this dish from the full loaded set
  const comments = useAppSelector((state) =>
    state.comments.data.filter((c) => c.dishId === dishId)
  );
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
