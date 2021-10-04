import classes from "./SearchBar.module.css";
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
        <div className={classes.title}>Summary of Events</div>
        <div className={classes.search}>
          <form className={classes.Searchform} onSubmit={onSearch}>
            <input
            type="date"
              ref={searchValue}
              onChange={onSearch}
              className={classes.searchInput}
              placeholder="Search with Date.."
            ></input>
            <button type="submit" hidden id="submit"></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchBar;

