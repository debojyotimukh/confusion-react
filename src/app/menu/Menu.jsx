import { useSelector } from "react-redux";
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
import Loading from "../common/Loading";

const Menu = () => {
  const dishes = useSelector((state) => state.dishes);

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
            <DishCard dish={dish} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

const DishCard = ({ dish }) => {
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
