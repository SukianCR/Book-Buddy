import { useEffect, useState } from "react";

import { useGetBookQuery } from "./../api";

export default function SelectedBook({ setSelectedBookId, selectedBookId }) {
  const [book, setBook] = useState({});
  const { data, isSuccess } = useGetBookQuery(selectedBookId);

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
