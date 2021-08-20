import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ModulePage from "./Pages/ModulePage/ModulePage";
import Services from "./Pages/Services/Services";
import JobPortal from "./Pages/JobPortal/Jobportal";
import JobFullView from "./Pages/JobViewer/JobFullView";
import JobSave from "./Pages/JobSave/JobSave";
import ModulePageInsights from "./Pages/ModulePageReport/ModulePageInsights";
import SelectMaterial from "./Pages/SelectMaterials/SelectMaterial"

import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/my-courses/insight/:moduleID" exact component={ModulePageInsights}/>
        <Route path="/my-courses/select_type/:week" exact component={SelectMaterial}/>
        <Route path="/my-courses/:moduleID" exact component={ModulePage}/>
        <Route path="/services/job_portal/editJob/:jobId" exact component={JobSave}/>
        <Route path="/services/job_portal/:jobId" exact component={JobFullView}/>
        <Route path="/services/job_portal" exact component={JobPortal}/>
        <Route path="/services" exact component={Services}/>
        <Route path="/dashboard" exact />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
