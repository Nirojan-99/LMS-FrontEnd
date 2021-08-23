import ModuleView from "./Components/ModuleView"
import classes from "./ModulepageView.module.css"
import plus from "../../../Assets/plus.svg"

const ModulepageView = () => {
     return(

        <div className={classes.ModulepageView}>
            
        <ModuleView/>
        <ModuleView/>
        <ModuleView/>
        <ModuleView/>
        <div className={classes.ModulepageView_view}>
        <a href="/faculties/semesteryear/:semester/Module/Addmodule">
        <img src={plus} className={classes.img_buttons}></img>
            </a>

            </div>
        </div>
     )
}
export default ModulepageView;