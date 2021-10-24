import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import "./App.css";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";

function App() {
  return (
    <>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </ConnectedRouter>
    </>
  );
}

export default App;
