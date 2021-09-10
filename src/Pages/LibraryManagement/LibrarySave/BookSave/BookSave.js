import classes from "./BookSave.module.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

const BookSave = (props) => {
  const history = useHistory();

  const id = props.match.params.bookID;
  const [edit, setEdit] = useState(false);
  const [btn, setBtn] = useState("SAVE");

  useEffect(() => {
    if (!id) {
      setEdit(false);
    } else {
      setEdit(true);
      axios
        .get("http://localhost:5000/library/get_book?id=" + id)
        .then((res) => {
          console.log(res.data);
          setAuthor(res.data.author);
          setBookName(res.data.name);
          setBookDetails(res.data.bookDetails);
          setPosterLink(res.data.bookPoster);
          setBookLink(res.data.book);
        })
        .catch((er) => {
          console.log("error");
        });
    }
  }, []);

  const [bookName, setBookName] = useState();
  const [author, setAuthor] = useState();
  const [bookDetails, setBookDetails] = useState();
  const [bookposter, setbookPoster] = useState();
  const [bookPoster, setbookPosterold] = useState();
  const [books, setbook] = useState();

  const [bookLink, setBookLink] = useState();
  const [posterLink, setPosterLink] = useState();

  const onbookSubmit = (event) => {
    const book = new FormData();

    event.preventDefault();

    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    book.append("bookPoster", bookposter);
    book.append("_id", id ? id : undefined);
    book.append("edit", edit);
    book.append("name", bookName);
    book.append("books", books);
    book.append("author", author);
    book.append("type", "book");
    book.append("bookDetails", bookDetails);
    book.append("date_time", datetime);

    setBtn("SAVING...");
    axios
      .post("http://localhost:5000/library/add_book", book)
      .then((res) => {
        if (res.data.ack === false) {
        } else {
          setBtn("SAVE");
          history.replace("/services/digital_library");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const bookNameHandler = (event) => {
    setBookName(event.target.value);
  };
  const authorHandler = (event) => {
    setAuthor(event.target.value);
  };
  const bookDetailsHandler = (event) => {
    setBookDetails(event.target.value);
  };
  const bookPosterHandler = (event) => {
    setbookPoster(event.target.files[0]);
  };
  const bookHandler = (event) => {
    setbook(event.target.files[0]);
  };

  return (
    <div className={classes.CardView}>
      <h2 className={classes.title}>Add Book</h2>
      <hr className={classes.line}></hr>
      <form
        enctype="multipart/form-data"
        className={classes.formContainer}
        onSubmit={onbookSubmit}
      >
        <label htmlFor="name" className={classes.lables}>
          Book Title :
        </label>
        <br />
        <input
          onChange={bookNameHandler}
          value={bookName}
          type="text"
          id="name"
          name="bookName"
          className={classes.inputs}
        ></input>

        <label htmlFor="company" className={classes.lables}>
          Author Name :
        </label>
        <br />
        <input
          onChange={authorHandler}
          value={author}
          type="text"
          id="company"
          name="author"
          className={classes.inputs}
        ></input>

        <label htmlFor="details" className={classes.lables}>
          About Book :
        </label>
        <br />
        <textarea
          required
          onChange={bookDetailsHandler}
          value={bookDetails}
          id="details"
          name="details"
          className={classes.textArea}
        ></textarea>

        <label htmlFor="poster" className={classes.lables}>
          {id && <img className={classes.posterView} src={bookPoster} />}
          Upload Book Poster :
        </label>
        <br />

        {id && (
          <input
            onChange={bookPosterHandler}
            // value={bookposter}
            type="file"
            id="poster"
            name="author"
            className={classes.inputs}
          ></input>
        )}
        {!id && (
          <input
            onChange={bookPosterHandler}
            required
            type="file"
            id="poster"
            name="author"
            className={classes.inputs}
          ></input>
        )}
        {id && (
          <a className={classes.link} href={posterLink}>
            view current file
          </a>
        )}
        <br />

        <label htmlFor="book" className={classes.lables}>
          {id && <img className={classes.posterView} src={bookPoster} />}
          Upload Book :
        </label>
        <br />

        {id && (
          <input
            onChange={bookHandler}
            // value={bookposter}
            type="file"
            id="book"
            name="book"
            className={classes.inputs}
          ></input>
        )}
        {!id && (
          <input
            onChange={bookHandler}
            required
            type="file"
            id="book"
            name="book"
            className={classes.inputs}
          ></input>
        )}
        {id && (
          <a className={classes.link} href={bookLink}>
            view current file
          </a>
        )}
        <br />

        <button className={classes.save}>{btn}</button>
      </form>
    </div>
  );
};

export default BookSave;
