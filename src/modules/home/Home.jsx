import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import Loading from "../common/Loading";
import { useEffect, useState } from "react";
import { fetchAll } from "../../services";
import { baseUrl } from "../../constants";

const Home = () => {
  const [dish, setDish] = useState({});
  const [dishesLoading, setDishesLoading] = useState(true);
  const [dishesErrMsg, setDishesErrMsg] = useState(null);

  const dishLoaded = (data) => {
    console.log(JSON.stringify(data));
    setDish(data && data.filter((dish) => dish.featured)[0]);
    setDishesLoading(false);
  };

  const dishFailed = (errMsg) => {
    setDishesErrMsg(errMsg);
    setDishesLoading(false);
  };

  const [promo, setPromo] = useState({});
  const [promoLoading, setPromoLoading] = useState(true);
  const [promoErrMsg, setPromoErrMsg] = useState(null);
  const promoLoaded = (data) => {
    setPromo(data && data.filter((item) => item.featured)[0]);
    setPromoLoading(false);
  };

  const promoFailed = (errMsg) => {
    setPromoErrMsg(errMsg);
    setPromoLoading(false);
  };

  const [leader, setLeader] = useState({});
  const [leaderLoading, setLeaderLoading] = useState(true);
  const [leaderErrMsg, setLeaderErrMsg] = useState(null);
  const leaderLoaded = (data) => {
    setLeader(data && data.filter((item) => item.featured)[0]);
    setLeaderLoading(false);
  };

  const leaderFailed = (errMsg) => {
    setLeaderErrMsg(errMsg);
    setLeaderLoading(false);
  };

  useEffect(() => {
    fetchAll("dishes", dishLoaded, dishFailed);
    fetchAll("promotions", promoLoaded, promoFailed);
    fetchAll("leaders", leaderLoaded, leaderFailed);
  }, []);

  return (
    <div className="container">
      <div className="row align-items-start">
        <HomeCard item={dish} isLoading={dishesLoading} errMsg={dishesErrMsg} />
        <HomeCard item={promo} isLoading={promoLoading} errMsg={promoErrMsg} />
        <HomeCard
          item={leader}
          isLoading={leaderLoading}
          errMsg={leaderErrMsg}
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