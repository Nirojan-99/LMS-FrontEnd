import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ModulePage from "./Components/ModulePage/ModulePage";

import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/my-courses/:moduleID" exact component={ModulePage}/>
        <Route path="/dashboard" exact />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
