import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

const RenderCard = ({ item, isLoading, errMsg }) => {
  if (isLoading) {
    return <Loading />;
  }
  if (errMsg) {
    return <h4>{errMsg}</h4>;
  }
  return (
    <FadeTransform
      in
      transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
    >
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
    </FadeTransform>
  );
};

const Home = (props) => {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMsg={props.dishesErrMsg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promoLoading}
            errMsg={props.promoErrMsg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leader}
            isLoading={props.leaderLoading}
            errMsg={props.leaderErrMsg}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
