import classes from "./LibraryPortal.module.css";
import BookCardView from "./BookCardView/BookCardView";
import PaperCardView from "./PaperCardView/PaperCardView";
import SearchBar from "./SearchBar";

import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { useSelector } from "react-redux";

const LibraryPortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [isError, setError] = useState(false);
  const [books, setbooks] = useState([]);
  const [papers, setPapers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const type = "admin";

  useEffect(() => {
    axios
      .get("http://localhost:5000/library/get_books")
      .then((res) => {
       
        if (res.data.auth === false) {
          // setErrorMsg(res.data.error);
          // setError(true);
          // setLoaded(true);
        } else {
          setError(false);
          setLoaded(true);
          setbooks(res.data.books);
          setPapers(res.data.papers);

          // setJobs(res.data);
          // console.log(typeof res.data[0]);
          // setLoaded(true);
        }
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const hideError = () => {
    setError(false);
  };

  const [updatedList, setList] = useState(books);
  const [isEmptyList, setEmpty] = useState(false);

  const getSearchValue = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setList(books);
      return;
    }

    const updated = books.filter((book) => book.name === value);
    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    }
  };
  console.log(books)
  return (
    <>
      <>
        {isError && <ErrorPopup error={errorMsg} clickedHandler={hideError} />}
        <div className={classes.bookBar}>
          <div className={classes.title}>E-BOOK </div>
          <SearchBar className={classes.searchbar} onSearch={getSearchValue} />
        </div>
        <div className={classes.jobCard}>
          {loaded && books ? (
            books.map((row) => {
              // return <BookCardView row={row} key={row._id} />;
              <div>row.name</div>;
            })
          ) : (
            <Loader />
          )}
        </div>

        {type === "admin" && loaded && (
          <div className={classes.addJob}>
            <a href="/book_save">ADD</a>
          </div>
        )}
      </>
      <>
        {isError && <ErrorPopup error={errorMsg} clickedHandler={hideError} />}
        <div className={classes.title}>PastPaers</div>
        <div className={classes.jobCard}>
          {loaded && papers ? (
            papers.map((row) => {
              return <PaperCardView row={row} key={row._id} />;
            })
          ) : (
            <Loader />
          )}
        </div>

        {type === "admin" && loaded && (
          <div className={classes.addJob}>
            <a href="/paper_save">ADD</a>
          </div>
        )}
      </>
    </>
  );
};
export default LibraryPortal;
