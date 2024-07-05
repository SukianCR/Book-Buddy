import { useTakeBookMutation } from "./../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookLi({ setSelectedBookId, book, user }) {
  return (
    <li
      key={book.id}
      className="player-card"
      onClick={() => {
        setSelectedBookId(book.id);
      }}
    >
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
        {book.available && <p>Available: {book.available}</p>}
      </div>
    </li>
  );
}
