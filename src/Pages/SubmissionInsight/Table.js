import classes from "./SubmissionInsight.module.css"

const Table = (props)=>{
    return <div className={classes.container}>
    <table className={classes.table_container}>
        <tr>
            <td>Total Submissions</td>
            <td>{props.submission}</td>
        </tr>
        <tr>
            <td>Total Late Submissions</td>
            <td>{props.late}</td>
        </tr>
        <tr>
            <td>Total Enrollments</td>
            <td>{props.enrollment}</td>
        </tr>
        
    </table>
</div>;
}

export default Table