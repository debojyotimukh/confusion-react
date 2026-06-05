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
  const dishesLoaded   = useAppSelector((state) => state.dishes.data.length > 0);
  const promosLoaded   = useAppSelector((state) => state.promotions.data.length > 0);
  const leadersLoaded  = useAppSelector((state) => state.leaders.data.length > 0);

  const dishIsLoading    = useAppSelector((state) => state.dishes.isLoading);
  const promoIsLoading   = useAppSelector((state) => state.promotions.isLoading);
  const leaderIsLoading  = useAppSelector((state) => state.leaders.isLoading);

  const dishErr    = useAppSelector((state) => state.dishes.error);
  const promoErr   = useAppSelector((state) => state.promotions.error);
  const leaderErr  = useAppSelector((state) => state.leaders.error);

  const featuredDish   = useAppSelector(selectFeaturedDish);
  const featuredPromo  = useAppSelector(selectFeaturedPromo);
  const featuredLeader = useAppSelector(selectFeaturedLeader);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!dishesLoaded)  dispatch(fetchDishes());
    if (!promosLoaded)  dispatch(fetchPromos());
    if (!leadersLoaded) dispatch(fetchLeaders());
  }, [dishesLoaded, promosLoaded, leadersLoaded, dispatch]);

  return (
    <div className="container">
      <div className="row align-items-start">
        <HomeCard item={featuredDish}   isLoading={dishIsLoading}   errMsg={dishErr} />
        <HomeCard item={featuredPromo}  isLoading={promoIsLoading}  errMsg={promoErr} />
        <HomeCard item={featuredLeader} isLoading={leaderIsLoading} errMsg={leaderErr} />
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
