import classes from "./LibraryReportSearchBar.module.css";
import { useRef } from "react";

const UserReportSearchBar = (props) => {
  const searchValue = useRef();

  const onSearch = (e) => {
    e.preventDefault();
    props.onSearch(searchValue.current.value);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.search}>
          <form className={classes.Searchform} onSubmit={onSearch}>
            <input
            onChange={onSearch}
              ref={searchValue}
              className={classes.searchInput}
              placeholder="User ID"
            ></input>
          </form>
        </div>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};

export default UserReportSearchBar;
