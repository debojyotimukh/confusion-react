import { useState, useEffect } from "react";
import Loading from "../common/Loading";
import { baseUrl } from "../../constants";
import { get } from "../../services";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardImg,
  CardTitle,
  CardImgOverlay,
} from "reactstrap";
import { Link } from "react-router-dom";

const Menu = () => {
  const [dishes, setDishes] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  const dishLoaded = (data) => {
    setDishes(data);
    setLoading(false);
  };

  const dishFailed = (errMsg) => {
    setErrMsg(errMsg);
    setLoading(false);
  };

  useEffect(() => {
    get("dishes", dishLoaded, dishFailed);
  }, []);

  return isLoading ? (
    <div className="container">
      <div className="row">
        <Loading />
      </div>
    </div>
  ) : errMsg ? (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h4>{errMsg}</h4>
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
        {dishes.map((dish) => (
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
