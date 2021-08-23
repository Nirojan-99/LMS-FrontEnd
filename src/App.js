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

import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import FacultiesView from "./Pages/FacultiesPage/FacultiesView/FacultiesView";
import ModuleEnrollmentReport from "./Pages/ModulePageView/ModuleEnrollmentReport/ModuleEnrollmentReport";
import AddFaculties from "./Pages/FacultiesPage/AddFaculties/AddFaculties";
import Addcourse from "./Pages/CoursePage/Addcourse/Addcourse";
import CoursePage from "./Pages/CoursePage/CoursePage";
import ModulepageView from "./Pages/ModulePageView/ModulepageView/ModulepageView";
import AddModule from "./Pages/ModulePageView/ModulepageView/AddModule/AddModule";
import ModuleEnrollment from "./Pages/ModulePageView/ModuleEnrollmentPage/ModuleEnrollmentPage";






function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/my-courses/submission/:ID" exact component={Submit}/>
        <Route path="/my-courses/attandance/:ID" exact component={Attandance}/>
        <Route path="/my-courses/submisson_insight/:moduleID" exact component={SubmissionInsight}/>
        <Route path="/my-courses/insight/:moduleID" exact component={ModulePageInsights}/>
        <Route path="/my-courses/add_attandance/:module/:week" exact component={AddAttandance}/>
        <Route path="/my-courses/add_submission/:module/:week" exact component={AddSubmission}/>
        <Route path="/my-courses/add_notes/:module/:week" exact component={AddNotes}/>
        <Route path="/my-courses/add_file/:module/:week" exact component={AddFile}/>
        <Route path="/my-courses/add_link/:module/:week" exact component={AddLink}/>
        <Route path="/my-courses/select_type/:module/:week" exact component={SelectMaterial}/>
        <Route path="/my-courses/:moduleID" exact component={ModulePage}/>
        <Route path="/services/job_portal/editJob/:jobId" exact component={JobSave}/>
        <Route path="/services/job_portal/:jobId" exact component={JobFullView}/>
        <Route path="/services/job_portal" exact component={JobPortal}/>
        <Route path="/services" exact component={Services}/>
        <Route path="/dashboard" exact />
        <Route path="/faculties" exact component={FacultiesView}/>
        <Route path="/Addfaculties/semesteryear/semester/Module/:moduleid" exact component={ModuleEnrollmentReport}/>
        <Route path="/faculties/Addfaculties" exact component={AddFaculties}/>
        <Route path="/faculties/Addcourse" exact component={Addcourse}/>
        <Route path="/faculties/semesteryear/:semester" exact component={CoursePage}/>
        <Route path="/faculties/semesteryear/:semester/Module" exact component={ModulepageView}/>
        <Route path="/faculties/semesteryear/:semester/Module/Addmodule" exact component={AddModule}/>
        <Route path="/faculties/semesteryear/:semester/Module/ModuleEnrollment" exact component={ModuleEnrollment}/>
 
       
       
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
