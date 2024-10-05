import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

import { useEffect, useReducer } from "react";
import { baseUrl } from "../../constants";
import { getAndDispatch } from "../../services";
import Loading from "../common/Loading";
import { fetchReducer, pendingState } from "../common/fetchReducer";

const Home = () => {
  const [dish, dishesDispatch] = useReducer(fetchReducer, pendingState);
  const [promo, promoDispatch] = useReducer(fetchReducer, pendingState);
  const [leader, leaderDispatch] = useReducer(fetchReducer, pendingState);
  const filterFeatured = (data) =>
    data && data.filter((item) => item.featured)[0];

  useEffect(() => {
    getAndDispatch("dishes", dishesDispatch, filterFeatured);
    getAndDispatch("promotions", promoDispatch, filterFeatured);
    getAndDispatch("leaders", leaderDispatch, filterFeatured);
  }, []);

  return (
    <div className="container">
      <div className="row align-items-start">
        <HomeCard
          item={dish.data}
          isLoading={dish.isLoading}
          errMsg={dish.error}
        />
        <HomeCard
          item={promo.data}
          isLoading={promo.isLoading}
          errMsg={promo.error}
        />
        <HomeCard
          item={leader.data}
          isLoading={leader.isLoading}
          errMsg={leader.error}
        />
      </div>
    </div>
  );
};

export default Home;

const HomeCard = ({ item, isLoading, errMsg }) => {
  return (
    <div className="col-4 col-md m-1">
      {isLoading ? (
        <Loading />
      ) : errMsg ? (
        <h4>{errMsg}</h4>
      ) : (
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? (
              <CardSubtitle>{item.designation}</CardSubtitle>
            ) : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
