import classes from "./Search.module.css";
import Table from "./Table";
import search from "../../Assets/search.svg"
import {useRef} from 'react'


const Search = (props) => {
    const searchValue = useRef();
    
    const onSearch=(e)=>{
        e.preventDefault();
    props.onSearch(searchValue.current.value)

    }
    
  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}></div>
        <div className={classes.search}>
            <form className={classes.Searchform} onSubmit={onSearch}>
                <input ref={searchValue} className={classes.searchInput} placeholder="student ID"></input>
                <label for="submit" className={classes.iconLabel}><img className={classes.icon} src={search}/></label>
                <button type="submit" hidden id="submit" ></button>
            </form>
        </div>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};

export default Search;
