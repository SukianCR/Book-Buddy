import { useReturnBookMutation } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBookLi({ book }) {
  const navigate = useNavigate();
  const [bookReturned] = useReturnBookMutation();
  const [errM, setErrM] = useState([]);

  const returnBook = async (book) => {
    try {
      let success = false;

      success = await bookReturned(book.id).unwrap();

      console.log("sux es:", success);

      if (success) {
        navigate("/account");
      }
    } catch (err) {
      setErrM(err.data.message);
    }
  };

  return (
    <li key={book.id} className="player-card">
      <img src={book.coverimage} alt={book.title} className="player-image" />
      <div className="player-details">
        <h4
          className="hotpink {
      "
        >
          {book.title}
        </h4>
        <p className="author">{book.author}</p>
        <p className="desc">{book.description}</p>
        {/* <p>{book.available}</p> */}

        <button className="btn-primary" onClick={returnBook(book)}>
          Retun book
        </button>
        {errM && <div>errM</div>}
      </div>
    </li>
  );
}
