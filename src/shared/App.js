import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import "./App.css";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import Either from "../pages/Either";
import EitherEdit from "../pages/EitherEdit";
import Multi from "../pages/Multi";
import MultiEdit from "../pages/MultiEdit";
import MultiDetail from "../pages/MultiDetail";
import CardWrite from "../pages/CardWrite";
import ErrorPage from "../pages/ErrorPage";
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile/:user_id" component={Profile} />
          <Route exact path="/search/:search?" component={Search} />
          <Route exact path="/either" component={Either} />
          <Route exact path="/either/:either_id" component={EitherEdit} />
          <Route exact path="/multi" component={Multi} />
          <Route exact path="/multi/:multi_id" component={MultiDetail} />
          <Route exact path="/multi/edit/:multi_id" component={MultiEdit} />
          <Route exact path="/write" component={CardWrite} />
          <Route path="*" component={ErrorPage} />
        </Switch>
        <Footer></Footer>
      </ConnectedRouter>
    </>
  );
}

export default App;
