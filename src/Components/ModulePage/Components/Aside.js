import classes from './Aside.module.css'
import Navigation from './Navigation'

const Aside = ()=>{
    return(
        <aside className={classes.aside}>
           <h3 >Module Name</h3> 
           <Navigation/>
        </aside>
        
    )
}

export default Aside