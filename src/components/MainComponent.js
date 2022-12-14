import React, { Component } from "react";
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders,
});

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});
class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errMsg}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMsg={this.props.promotions.errMsg}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMsg={this.props.leaders.errMsg}
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
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(dishId, 10)
          )}
          commentsErrMsg={this.props.comments.errMsg}
          postComment={this.props.postComment}
        />
      );
    };

    const MainTransitionRoutes = () => {
      // Ref: https://tech.lalilo.com/dynamic-transitions-with-react-router-and-react-transition-group
      const location = useLocation();
      return (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={300}>
            <Routes location={location}>
              <Route exact path="/home" element={<HomePage />} />
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
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                }
              />
              <Route
                exact
                path="/aboutus"
                element={<About leaders={this.props.leaders} />}
              />
              <Route exact path="*" element={<Navigate to="/home" />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      );
    };

    return (
      <div className="App">
        <Header />
        <MainTransitionRoutes />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
