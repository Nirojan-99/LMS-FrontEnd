import classes from "./SearchBar.module.css";
import search from "../../../Assets/search.svg";
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
        <div className={classes.title}>Student Portal</div>
        <div className={classes.search}>
          <form className={classes.Searchform} onSubmit={onSearch}>
            <input
              ref={searchValue}
              onChange={onSearch}
              className={classes.searchInput}
              placeholder="student ID"
            ></input>
            {/* <label for="submit" className={classes.iconLabel}>
              <img className={classes.icon} src={search} />
            </label> */}
            <button type="submit" hidden id="submit"></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
