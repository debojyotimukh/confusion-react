import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../constants";
import { fetchDishes, selectFeaturedDish } from "../../features/dish/dishSlice";
import {
  fetchLeaders,
  selectFeaturedLeader,
} from "../../features/leader/leaderSlice";
import {
  fetchPromos,
  selectFeaturedPromo,
} from "../../features/promo/promoSlice";
import Loading from "../common/Loading";

const Home = () => {
  const dish = useSelector((state) => state.dishes);
  const promo = useSelector((state) => state.promotions);
  const leader = useSelector((state) => state.leaders);

  const dispatch = useDispatch();

  useEffect(() => {
    if (dish.data.length === 0) dispatch(fetchDishes());
    if (promo.data.length === 0) dispatch(fetchPromos());
    if (leader.data.length === 0) dispatch(fetchLeaders());
  }, [dish, promo, leader, dispatch]);

  return (
    <div className="container">
      <div className="row align-items-start">
        <HomeCard
          item={useSelector(selectFeaturedDish)}
          isLoading={dish.isLoading}
          errMsg={dish.error}
        />
        <HomeCard
          item={useSelector(selectFeaturedPromo)}
          isLoading={promo.isLoading}
          errMsg={promo.error}
        />
        <HomeCard
          item={useSelector(selectFeaturedLeader)}
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
            {item.designation && (
              <CardSubtitle>{item.designation}</CardSubtitle>
            )}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
