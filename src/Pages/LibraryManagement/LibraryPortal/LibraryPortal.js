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
  const [loaded1, setLoaded1] = useState(false);
  const [isError, setError] = useState(false);
  const [books, setbooks] = useState([]);
  const [papers, setPapers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const type = useSelector((state) => state.loging.type);

  useEffect(() => {
    axios
      .get("http://localhost:5000/library/get_books")
      .then((res) => {
        if (res.data.auth === false) {
        } else if (res.data.books) {
          setError(false);
          setLoaded(true);
          setbooks(res.data.books);
          setList(res.data.books);
        } else {
          setLoaded(true);
        }
      })
      .catch((er) => {
        console.log("error");
      });

    axios
      .get("http://localhost:5000/library/get_papers")
      .then((res) => {
        if (res.data.auth === false) {
        } else {
          setError(false);
          setLoaded1(true);
          setPapers(res.data);
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

    const updated = books.filter((book) =>
      book.name.toUpperCase().includes(value.trim().toUpperCase())
    );
    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    }
  };

  return (
    <>
      <>
        {isError && <ErrorPopup error={errorMsg} clickedHandler={hideError} />}
        <div className={classes.title}>Books</div>
        <div className={classes.bookBar}>
          <br />
          <div className={classes.search}>
            <SearchBar
              className={classes.searchbar}
              onSearch={getSearchValue}
            />
          </div>
        </div>
        <div className={classes.jobCard}>
          {loaded && books ? (
            updatedList.map((row) => {
              return <BookCardView row={row} key={row._id} />;
            })
          ) : (
            <Loader />
          )}
        </div>
        {isEmptyList && (
          <div className={classes.searchError}>No search results found!</div>
        )}

        {type === "admin" && loaded && (
          <div className={classes.addJob}>
            <a href="/services/book_save">ADD</a>
          </div>
        )}
      </>
      <>
        {isError && <ErrorPopup error={errorMsg} clickedHandler={hideError} />}
        <div className={classes.title}>PastPapers</div>
        <div className={classes.jobCard}>
          {loaded1 && papers ? (
            papers.map((row) => {
              return <PaperCardView row={row} key={row._id} />;
            })
          ) : (
            <Loader />
          )}
        </div>

        {type === "admin" && loaded && (
          <div className={classes.addJob}>
            <a href="/services/paper_save">ADD</a>
          </div>
        )}
      </>
    </>
  );
};
export default LibraryPortal;
