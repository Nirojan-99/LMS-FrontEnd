import classes from "./SelectMaterial.module.css"

const SelectMaterial = (props)=>{

    const week = props.match.params.week;
    const module = props.match.params.module;

    return(<div className={classes.container}>
        <h2 className={classes.title}>ADD MATERIALS</h2>
        <hr className={classes.line}></hr>
        {/* <h3 className={classes.sub_title}>Select Type</h3> */}
            <a href={"../../add_file/"+module+"/"+week}><div className={classes.selection}>Files</div></a>
            <a href={"../../add_link/"+module+"/"+week}><div className={classes.selection}>Links</div></a>
            <a href={"../../add_quiz/"+module+"/"+week}><div className={classes.selection}>Quiz</div></a>
            <a href={"../../add_attandance/"+module+"/"+week}><div className={classes.selection}>Attandance</div></a>
            <a href={"../../add_notes/"+module+"/"+week}><div className={classes.selection}>Notes/Announcement</div></a>
            <a href={"../../add_discussion/"+module+"/"+week}><div className={classes.selection}>Discussion Forum</div></a>
            <a href={"../../add_submission/"+module+"/"+week}><div className={classes.selection}>Submission</div></a>
        </div>)
}

export default SelectMaterial