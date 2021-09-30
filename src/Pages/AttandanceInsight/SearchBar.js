import classes from "./SearchBar.module.css";
import Table from "./Table";
import search from "../../Assets/search.svg";
import { useRef } from "react";

const SearchBar = (props) => {
  const searchValue = useRef();

  const onSearch = (e) => {
    e.preventDefault();
    props.onSearch(searchValue.current.value);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}></div>
        <div className={classes.search}>
          <form className={classes.Searchform} onSubmit={onSearch}>
            <input
              ref={searchValue}
              onChange={onSearch}
              className={classes.searchInput}
              placeholder="student ID"
            ></input>
            <button type="submit" hidden id="submit"></button>
          </form>
        </div>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};

export default SearchBar;
