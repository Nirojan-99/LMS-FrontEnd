import classes from "./Entrolment.module.css";
import Details from "./MainDetails.js";
import { useState } from "react";


const ModuleCourseInsights = () => {
    

  const coursename =[
    {"id":"Communication Skills","access":"Unentroll"},
    {"id":"Mathematics For Computing","access":"Unentroll"},
    {"id":"MobileApp Development","access":"Unentroll"},
    {"id":"Database Management","access":"Unentroll"},
  ]

  const [updatedList , setList] = useState(coursename)
  const [isEmptyList , setEmpty] = useState(false)

  const getSearchValue = (value) => {
    if(!value.trim()){
      setEmpty(false)
      setList(coursename)
      return
    }
   
    const updated = coursename.filter(course=>course.id === value)
   setList(updated)
   if(updated.length === 0){
    setEmpty(true)
   }
  };

  return (
    <div className={classes.container}>
          
      <div className={classes.report_container}>
      
      </div>
      {updatedList.map((row)=>{
        return <span className={classes.span}>
            <Details data={row} key={row.id}/>
            
        </span>
        
      })}
      {isEmptyList && <div className={classes.message}>no results found !</div>}
    
    </div>
  );
};

export default ModuleCourseInsights;
