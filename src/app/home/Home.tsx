import { useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { baseUrl } from "../../constants";
import { fetchDishes, selectFeaturedDish } from "../../features/dish/dishSlice";
import { fetchLeaders, selectFeaturedLeader } from "../../features/leader/leaderSlice";
import { fetchPromos, selectFeaturedPromo } from "../../features/promo/promoSlice";
import { Dish, Leader, Promotion } from "../../types";
import Loading from "../common/Loading";

const Home = () => {
  const dish = useAppSelector((state) => state.dishes);
  const promo = useAppSelector((state) => state.promotions);
  const leader = useAppSelector((state) => state.leaders);
  const featuredDish = useAppSelector(selectFeaturedDish);
  const featuredPromo = useAppSelector(selectFeaturedPromo);
  const featuredLeader = useAppSelector(selectFeaturedLeader);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dish.data.length === 0) dispatch(fetchDishes());
    if (promo.data.length === 0) dispatch(fetchPromos());
    if (leader.data.length === 0) dispatch(fetchLeaders());
  }, [dish.data.length, promo.data.length, leader.data.length, dispatch]);

  return (
    <div className="container">
      <div className="row align-items-start">
        <HomeCard
          item={featuredDish}
          isLoading={dish.isLoading}
          errMsg={dish.error}
        />
        <HomeCard
          item={featuredPromo}
          isLoading={promo.isLoading}
          errMsg={promo.error}
        />
        <HomeCard
          item={featuredLeader}
          isLoading={leader.isLoading}
          errMsg={leader.error}
        />
      </div>
    </div>
  );
};

export default Home;

type HomeItem = Dish | Leader | Promotion;

interface HomeCardProps {
  item: HomeItem | undefined;
  isLoading: boolean;
  errMsg: string | null;
}

const HomeCard = ({ item, isLoading, errMsg }: HomeCardProps) => {
  return (
    <div className="col-4 col-md m-1">
      {isLoading ? (
        <Loading />
      ) : errMsg ? (
        <h4>{errMsg}</h4>
      ) : item ? (
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {"designation" in item && (
              <CardSubtitle>{item.designation}</CardSubtitle>
            )}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
};
