import React, { Component } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";
import { addComment, fetchDishes } from "../redux/ActionCreators";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders,
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
});
class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errMsg}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = () => {
      const { dishId } = useParams();
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMsg={this.props.dishes.errMsg}
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route
            exact
            path="/menu"
            element={<Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" element={<DishWithId />} />
          <Route
            exact
            path="/contactus"
            element={
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            }
          />
          <Route
            exact
            path="/aboutus"
            element={<About leaders={this.props.leaders} />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
