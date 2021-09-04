import classes from './Aside.module.css'
import Navigation from './Navigation'
import {MdAccountCircle} from "react-icons/md"

const Aside = ()=>{
    return(
        <aside className={classes.aside}>
            <MdAccountCircle size ={100}/>
            <h3 >User Name</h3>
            <Navigation/>
        </aside>
        
    )
}

export default Aside