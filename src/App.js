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
import AddLink from "./Pages/AddLectuerMaterial/AddLink/AddLink"
import AddAttandance from "./Pages/AddLectuerMaterial/AddAttandance/AddAttandance"
import AddFile from "./Pages/AddLectuerMaterial/AddFile/AddFile"
import AddNotes from "./Pages/AddLectuerMaterial/AddNotes/AddNotes"
import AddSubmission from "./Pages/AddLectuerMaterial/AddSubmission/AddSubmission"
import SubmissionInsight from "./Pages/SubmissionInsight/SubmissionInsight"
import Attandance from "./Pages/Attandance/Attandance"
import Submit from "./Pages/Submit/Submit"
import AddUser from "./Pages/UserManagement/AddUser/AddUser";
import UserReport from "./Pages/UserManagement/UserReport/UserReport";
import EditUser from "./Pages/UserManagement/EditUser/EditUser";
import AddRole from "./Pages/UserManagement/AddRole/NewRole";

import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/my-courses/submission/:ID" exact component={Submit}/>
        <Route path="/my-courses/attandance/:ID" exact component={Attandance}/>
        <Route path="/my-courses/submisson_insight/:moduleID" exact component={SubmissionInsight}/>
        <Route path="/my-courses/insight/:moduleID" exact component={ModulePageInsights}/>

        <Route path="/my-courses/add_attandance/:weekID" exact component={AddAttandance}/>
        <Route path="/my-courses/add_submission/:weekID" exact component={AddSubmission}/>
        <Route path="/my-courses/add_notes/:weekID" exact component={AddNotes}/>
        <Route path="/my-courses/add_file/:weekID" exact component={AddFile}/>
        <Route path="/my-courses/add_link/:weekID" exact component={AddLink}/>

        <Route path="/my-courses/edit_attandance/:MaterialID" exact component={AddAttandance}/>
        <Route path="/my-courses/edit_submission/:MaterialID" exact component={AddSubmission}/>
        <Route path="/my-courses/edit_notes/:MaterialID" exact component={AddNotes}/>
        <Route path="/my-courses/edit_file/:MaterialID" exact component={AddFile}/>
        <Route path="/my-courses/edit_link/:MaterialID" exact component={AddLink}/>

        <Route path="/my-courses/select_type/:weekID" exact component={SelectMaterial}/>
        <Route path="/my-courses/:moduleID" exact component={ModulePage}/>

        <Route path="/services/job_portal/editJob/:jobId" exact component={JobSave}/>
        <Route path="/services/job_portal/add_Job" exact component={JobSave}/>
        <Route path="/services/job/:jobId" exact component={JobFullView}/>
        <Route path="/services/job_portal" exact component={JobPortal}/>
        <Route path="/services" exact component={Services}/>

        <Route path="/add-user" exact component={AddUser} />
        <Route path="/user-report" exact component={UserReport}/>
        <Route path="/edit-user" exact component={EditUser} />
        <Route path="/add-role" exact component={AddRole}/>

        <Route path="/dashboard" exact />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
