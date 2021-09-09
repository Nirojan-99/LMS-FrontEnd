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
  //     const [jobs, setJobs] = useState([]);
  //   const [loaded, setLoaded] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const type = "admin";
  const loaded = true;
  const books = [
    {
      _id: "1",
      name: "Book1",
      aurthor: "Arivaran",
      details:
        "Describe your book in simple, straightforward, and consumer-friendly terms. Your description should be at least 150-200 words",
    },
    {
      _id: "2",
      name: "Book2",
      aurthor: "Nirushan",
      details:
        "You will find here below a number of short paragraphs on the topic Books of varying word lengths. We hope these paragraphs on Books will help students in completing t",
    },
    {
      _id: "3",
      name: "Book3",
      aurthor: "Niro",
      details:
        "Describe your book in simple, straightforward, and consumer-friendly terms. Your description should be at least 150-200 words",
    },
  ];

  const papers = [
    {
      _id: "12345767",
      title: "Software Enginerring PastPaper",
    },
    {
      _id: "123457676",
      title: "Software Enginerring PastPaper",
    },
    {
      _id: "123456767",
      title: "Software Enginerring PastPaper",
    },
  ];

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/get_jobs")
  //       .then((res) => {
  //         if (res.data.error) {
  //           setErrorMsg(res.data.error);
  //           setError(true);
  //           setLoaded(true);
  //         } else {
  //           setJobs(res.data);
  //           console.log(typeof res.data[0]);
  //           setLoaded(true);
  //         }
  //       })
  //       .catch((er) => {
  //         console.log("error");
  //       });
  //   }, []);

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
  return (
    <>
      <>
        {isError && <ErrorPopup error={errorMsg} clickedHandler={hideError} />}
        <div className={classes.bookBar}>
        <div className={classes.title}>E-BOOK </div>
        <SearchBar className={classes.searchbar} onSearch={getSearchValue} />
        
        </div>
        <div className={classes.jobCard}>
          {loaded ? (
            updatedList.map((row) => {
              return <BookCardView row={row} key={row._id} />;
            })
          ) : (
            <Loader></Loader>
          )}
        </div>

        {type === "admin" && loaded && (
          <div className={classes.addJob}>
            <a href="/book_save">ADD</a>
          </div>
        )}
        {/* <img src={plus} className={classes.plusIcon}/> */}
      </>
      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <>
        {isError && <ErrorPopup error={errorMsg} clickedHandler={hideError} />}
        <div className={classes.title}>PastPaers</div>
        <div className={classes.jobCard}>
          {loaded ? (
            papers.map((row) => {
              return <PaperCardView row={row} key={row._id} />;
            })
          ) : (
            <Loader></Loader>
          )}
        </div>

        {type === "admin" && loaded && (
          <div className={classes.addJob}>
            <a href="/paper_save">ADD</a>
          </div>
        )}
        {/* <img src={plus} className={classes.plusIcon}/> */}
      </>
    </>
  );
};
export default LibraryPortal;
