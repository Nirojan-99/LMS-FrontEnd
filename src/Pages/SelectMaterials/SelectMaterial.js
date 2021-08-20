import classes from "./SelectMaterial.module.css"

const SelectMaterial = ()=>{
    return(<div className={classes.container}>
        <h2 className={classes.title}>ADD MATERIALS</h2>
        <hr className={classes.line}></hr>
        {/* <h3 className={classes.sub_title}>Select Type</h3> */}
            <a href="../add_file/1"><div className={classes.selection}>Files</div></a>
            <a href="../add_link/1"><div className={classes.selection}>Links</div></a>
            <a href="../add_quiz/1"><div className={classes.selection}>Quiz</div></a>
            <a href="../add_attandance/1"><div className={classes.selection}>Attandance</div></a>
            <a href="../add_notes/1"><div className={classes.selection}>Notes/Announcement</div></a>
            <a href="../add_discussion/1"><div className={classes.selection}>Discussion Forum</div></a>
            <a href="../add_submission/1"><div className={classes.selection}>Submission</div></a>
        </div>)
}

export default SelectMaterial