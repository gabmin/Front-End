import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import Either from "../pages/Either";
import EitherDetail from "../pages/EitherDetail";
import EitherEdit from "../pages/EitherEdit";
import Multi from "../pages/Multi";
import MultiEdit from "../pages/MultiEdit";
import MultiDetail from "../pages/MultiDetail";
import CardWrite from "../pages/CardWrite";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/About";
import Footer from "../components/Footer";
import EventBanner from "../elements/EventBanner";

import "./App.css";
import GlobalStyle from "./GlobalStyle";
import background from "../images/background.png";

function App() {
  return (
    <>
      <BackGround />
      <GlobalStyle />
      <Header></Header>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile/:user_id" component={Profile} />
          <Route exact path="/search/:search?" component={Search} />
          <Route exact path="/either" component={Either} />
          <Route exact path="/either/:either_id" component={EitherDetail} />
          <Route exact path="/either/:either_id/edit" component={EitherEdit} />
          <Route exact path="/multi" component={Multi} />
          <Route exact path="/multi/:multi_id" component={MultiDetail} />
          <Route exact path="/multi/:multi_id/edit" component={MultiEdit} />
          <Route exact path="/write" component={CardWrite} />
          <Route exact path="/about" component={About} />
          <Route path="*" component={ErrorPage} />
        </Switch>
        <Footer></Footer>
      </ConnectedRouter>
      <EventBanner />
    </>
  );
}

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${background});
  z-index: -99999;
  opacity: 0.5;
  background-size: cover;
`;

export default App;
