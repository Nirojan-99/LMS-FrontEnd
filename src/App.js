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
import Login from "./Pages/Login/Login";
import store from "./Store";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import AddUser from "./Pages/UserManagement/AddUser/AddUser";
import UserReport from "./Pages/UserManagement/UserReport/UserReport";
import EditUser from "./Pages/UserManagement/EditUser/EditUser";
import AddRole from "./Pages/UserManagement/AddRole/NewRole";
import FacultiesView from "./Pages/FacultiesPage/FacultiesView/FacultiesView";
import ModuleEnrollmentReport from "./Pages/ModulePageView/ModuleEnrollmentReport/ModuleEnrollmentReport";
import AddFaculties from "./Pages/FacultiesPage/AddFaculties/AddFaculties";
import Addcourse from "./Pages/CoursePage/Addcourse/Addcourse";
import CoursePage from "./Pages/CoursePage/CoursePage";
import ModulepageView from "./Pages/ModulePageView/ModulepageView/ModulepageView";
import AddModule from "./Pages/ModulePageView/ModulepageView/AddModule/AddModule";
import ModuleEnrollment from "./Pages/ModulePageView/ModuleEnrollmentPage/ModuleEnrollmentPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AttandanceInsight from "./Pages/AttandanceInsight/AttandanceInsight";
import EventSummary from "./Pages/EventSummary/EventSummary";
import NewEvent from "./Pages/NewEvent/NewEvent";
import HelpDesk from "./Pages/HelpDesk/HelpDesk";
import HelpDeskAdmin from "./Pages/HelpDeskAdmin/HelpDeskAdmin";
import TicketView from "./Pages/TicketView/TicketView";
import Announcement from "./Pages/Announcement/Announcement";
import NewAnnouncement from "./Pages/NewAnnouncement/NewAnnouncement";
import View from "./Pages/AnnouncementFullView/View";
import EnrolledCourses from "./Pages/EnrolledCourses/EnrolledCourses";
import NewPassword from "./Pages/NewPassword/NewPassword";
import page404 from "./Pages/404/404";
import ContactUs from "./Pages/ContactUs/ContactUs";

import NewTimetable from "./Pages/Timetable/NewTimeTable/NewTimetable";
import timetable from "./Pages/Timetable/TimeTable/TimeTable";

import StudenList from "./Pages/Studentportal/StudentList/StudentList";
import UpdateGPA from "./Pages/Studentportal/AdminUpdateGPA/UpdateGPA";
import StudentPortal from "./Pages/Studentportal/StudentView/StudentPortal";

import ForumView from "./Pages/ForumManagement/ForumView/ForumView";
import WeekForumView from "./Pages/ForumManagement/WeekForumView/WeekForumView";
import AddForum from "./Pages/ForumManagement/AddForum/AddForum";

import BookSave from "./Pages/LibraryManagement/LibrarySave/BookSave/BookSave";
import PaperSave from "./Pages/LibraryManagement/LibrarySave/PastpaperSave/PaperSave";
import LibraryReport from "./Pages/LibraryManagement/LibraryReport/LibraryReport";
import LibraryPortal from "./Pages/LibraryManagement/LibraryPortal/LibraryPortal";

import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";

import ExamView from "./Pages/Exams/View";
import NewExam from "./Pages/Exams/new";
import EditExam from "./Pages/Exams/edit";
import ExamViewMark from "./Pages/ExamMarks/View";
import NewExamMark from "./Pages/ExamMarks/new";
import EditExamMark from "./Pages/ExamMarks/edit";


function App() {
  const isLogedIn = useSelector((state) => state.loging.isLogedIn);
  const type = useSelector((state) => state.loging.type);
  return (
    <Provider store={store}>
    <Router>
      <Header />
      { isLogedIn ?
      <Switch>
        <Route path="/my-courses/submission/:ID" exact component={Submit}/>
        <Route path="/my-courses/attandance/:ID" exact component={Attandance}/>
        <Route path="/my-courses/attandance/insights/:ID" exact component={AttandanceInsight}/>
        <Route path="/my-courses/submisson_insight/:moduleID" exact component={SubmissionInsight}/>
        <Route path="/my-courses/insight/:moduleID" exact component={ModulePageInsights}/>

        <Route path="/my-courses/add_attandance/:weekID" exact component={AddAttandance}></Route>
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
        <Route path="/my-courses/" exact component={EnrolledCourses}/>
        <Route path="/my-courses/:moduleID" exact component={ModulePage}/>

        <Route path="/services/job_portal/editJob/:jobId" exact component={JobSave}/>
        <Route path="/services/job_portal/add_Job" exact component={JobSave}/>
        <Route path="/services/job/:jobId" exact component={JobFullView}/>
        <Route path="/services/job_portal" exact component={JobPortal}/>
        <Route path="/services" exact component={Services}/>

        <Route path="/services/help_desk" exact component={HelpDesk}/>
        <Route path="/services/admin/help_desk" exact component={HelpDeskAdmin}/>
        <Route path="/services/eticket/:ticketID" exact component={TicketView}/>

        <Route path="/services/exams" exact component={ExamView}/>
        <Route path="/services/exams/new" exact component={NewExam}/>
        <Route path="/services/exams/edit/:id" exact component={EditExam}/>

        <Route path="/services/exam_marks" exact component={ExamViewMark}/>
        <Route path="/services/exam_marks/new" exact component={NewExamMark}/>
        <Route path="/services/exam_marks/edit/:id" exact component={EditExamMark}/>

        <Route path="/services/student_portal" exact component={StudenList}/>
        <Route path="/services/student_portal/:SID" exact component={UpdateGPA}/>
        <Route path="/services/student_portal/view/:SID" exact component={StudentPortal}/>

        <Route path="/add-user" exact component={AddUser} />
        <Route path="/user-report" exact component={UserReport}/>
        <Route path="/edit-user/:editID" exact component={EditUser} />
        <Route path="/add-role" exact component={AddRole}/>

        <Route path="/services/timetable/new" exact component={NewTimetable}/>
        <Route path="/services/timetable" exact component={timetable}/>

        <Route path="/faculties" exact component={FacultiesView}/>
        <Route path="/faculties/module/insight/:moduleId" exact component={ModuleEnrollmentReport}/>
        <Route path="/faculties/Addfaculties" exact component={AddFaculties}/>
        <Route path="/faculties/editfaculties/:facultyId" exact component={AddFaculties}/>
        <Route path="/faculties/Addcourse/:facultyID" exact component={Addcourse}/>
        <Route path="/faculties/editcourse/:courseid" exact component={Addcourse}/>
        <Route path="/faculties/course/Year/:courseID" exact component={CoursePage}/>
        <Route path="/faculties/course/:Year/:semester/:ModuleID" exact component={ModulepageView}/>
        <Route path="/faculties/course/Addmodule/:Year/:semester/:moduleid" exact component={AddModule}/>
        <Route path="/faculties/module/:moduleid1" exact component={AddModule}/>
        <Route path="/faculties/enroll/:moduleID" exact component={ModuleEnrollment}/>

        <Route path="/my-profile" exact component={ProfilePage}/>
        <Route path="/calendar/:date" exact component={EventSummary}/>
        <Route path="/new_calendar" exact component={NewEvent}/>

        <Route path="/" exact ><Redirect to="/dashboard" /></Route>
        <Route path="/dashboard" exact component={Announcement}/>
        <Route path="/dashboard/announcement/:annID" exact component={View}/>
        <Route path="/dashboard/new_announcement" exact component={NewAnnouncement}>{type !== "admin" && <Redirect to="/dashboard" /> }</Route>
        <Route path="/dashboard/edit_announcement/:annID" exact component={NewAnnouncement}>{type !== "admin" && <Redirect to="/dashboard" /> }</Route>

        <Route path="/index" exact component={Login} >{isLogedIn &&  <Redirect to="/dashboard" />}</Route>
        <Route path="/index/reset_password" exact component={ResetPassword} />
        <Route path="/contact-us" exact component={ContactUs} />
        <Route path="/feedback" exact component={ContactUs} />
          
        <Route path="/my-courses/add-forum/:week" exact component={AddForum}/>
        <Route path="/forum/:moduleID/:weekID/:forumID" exact component={ForumView}/>
        <Route path="/weekforum" exact component={WeekForumView}/>
        
        <Route path="/services/book_save" exact component={BookSave}/>
        <Route path="/services/book/:bookID" exact component={BookSave}/>
        <Route path="/services/paper_save" exact component={PaperSave}/>
        <Route path="/services/paper/:paperId" exact component={PaperSave}/>
        <Route path="/services/digital_library" exact component={LibraryPortal}/>
        <Route path="/services/digital_library/report/:ID" exact component={LibraryReport}/>

        <Route path="*"  component={page404}/>
      </Switch>:
      <Switch>
        <Route path="/index" exact component={Login} ></Route>
        <Route path="/contact-us" exact component={ContactUs} />
        <Route path="/feedback" exact component={ContactUs} />
        <Route path="/index/reset_password" exact component={ResetPassword} />
        <Route path="/index/new_password/:userID" exact component={NewPassword} />
        <Route path="*" ><Redirect  to="/index" /></Route>
      </Switch>}



      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
