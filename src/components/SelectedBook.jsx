import { useEffect, useState } from "react";

import { useTakeBookMutation } from "./../api";

import { useNavigate } from "react-router-dom";
import { useGetBookQuery } from "./../api";

export default function SelectedBook({
  setSelectedBookId,
  selectedBookId,
  setActive,
  user,
}) {
  const [book, setBook] = useState({});
  const { data, isSuccess } = useGetBookQuery(selectedBookId);

  const [bookTaken] = useTakeBookMutation();
  const [errM, setErrM] = useState(null);
  const navigate = useNavigate();

  setActive("books");

  const takeBook = async (available) => {
    try {
      let success = false;

      const credentials = { available: available };
      success = await bookTaken(credentials, selectedBookId).unwrap();

      console.log("sux es:", success);

      if (success) {
        navigate("/account");
      }
    } catch (err) {
      setErrM(err.data.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const result = JSON.parse(data);

      setBook(result.book);
    }
  }, [isSuccess]);

  return (
    <>
      {" "}
      <div className="centro">
        <div
          key={book.id}
          className="selected-player-card"
          onClick={() => {
            setSelectedBookId(book.id);
          }}
        >
          <img
            src={book.coverimage}
            alt={book.title}
            className="player-image"
          />
          <div className="player-details">
            <h4
              className="hotpink {
    "
            >
              {book.title}
            </h4>
            <p className="author">{book.author}</p>
            <p className="desc">{book.description}</p>
            <p>{book.available}</p>

            {user && (
              <button className="btn-link" onClick={takeBook(book.available)}>
                Check out book
              </button>
            )}

            <button
              className="btn btn-primary "
              onClick={() => {
                setSelectedBookId(null);
                // console.log(selectedBookId);
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
