import classes from "./BookSave.module.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

const BookSave = (props) => {
  const history = useHistory();

  const id = props.match.params.bookId;
  const [edit, setEdit] = useState(false);
  const [btn, setBtn] = useState("SAVE");

  useEffect(() => {
    if (!id) {
      setEdit(false);
    } else {
      setEdit(true);
      axios
        .get("http://localhost:5000/get_book?id=" + id)
        .then((res) => {
          console.log(res.data);
          setAuthor(res.data.author);
          setBookName(res.data.name);
          setBookDetails(res.data.bookDetails);
          setbookPosterold(res.data.bookPoster);
          setBookId(res.data._id);
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
  const [bookId, setBookId] = useState();

  const onbookSubmit = (event) => {
    const book = new FormData();

    event.preventDefault();

    book.append("bookPoster", bookposter);
    book.append("_id", bookId ? bookId : undefined);
    book.append("edit", edit);
    book.append("name", bookName);
    book.append("author", author);
    book.append("bookDetails", bookDetails);

    // setBtn("SAVING...");
    // axios
    //   .post("http://localhost:5000/add_book", book)
    //   .then((res) => {
    //     console.log(res.data);
    //     // setBtn("Saved")
    //     history.replace("/services/library_portal");
    //   })
    //   .catch((er) => {
    //     console.log(er);
    //   });
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
          Upload Book :
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

<label for="faculty" className={classes.lables}>
          Visibility to the Student
        </label>
        <br />
        <input type="radio" name="visibility" id="visible" value="visible" className={classes.radio}></input>
        <label className={classes.radioLabel}>Visible</label>
        <br />
        <input type="radio" name="visibility" id="invisible" value="invisible" className={classes.radio}></input>
        <label className={classes.radioLabel}>Invisible</label>
        <br />

        <button className={classes.save}>{btn}</button>
      </form>
    </div>
  );
};

export default BookSave;
