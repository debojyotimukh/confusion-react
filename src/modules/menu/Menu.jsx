import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
} from "reactstrap";
import { baseUrl } from "../../constants";
import { get } from "../../services";
import Loading from "../common/Loading";
import {
  fetchActionTypes,
  fetchReducer,
  pendingState,
} from "../common/fetchReducer";

const Menu = () => {
  const [dishes, dishesDispatch] = useReducer(fetchReducer, pendingState);

  useEffect(() => {
    get(
      "dishes",
      (data) =>
        dishesDispatch({ type: fetchActionTypes.FULFILLED, payload: data }),
      (errmsg) =>
        dishesDispatch({ type: fetchActionTypes.REJECTED, payload: errmsg })
    );
  }, []);

  return dishes.isLoading ? (
    <div className="container">
      <div className="row">
        <Loading />
      </div>
    </div>
  ) : dishes.error ? (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h4>{dishes.error}</h4>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        {dishes.data.map((dish) => (
          <div key={dish.id} className="col-12 col-md-5 m-1">
            <RenderMenuItem dish={dish} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

const RenderMenuItem = ({ dish }) => {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>
            <h2>{dish.name}</h2>
          </CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
};
