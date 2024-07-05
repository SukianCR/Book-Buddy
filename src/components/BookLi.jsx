import { useTakeBookMutation } from "./../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetMeQuery } from "./../api";

import { setToken } from "./../api";
import { Navigate, Outlet } from "react-router-dom";

export default function BookLi({
  setSelectedBookId,
  book,
  user,
  setUser,
  token,
  myBooks,
  setMyBooks,
}) {
  const [bookTaken] = useTakeBookMutation();
  const dispatch = useDispatch();
  const [errM, setErrM] = useState(null);
  // const token3 = useSelector((state) => state.register.token);
  // console.log("token3", token3);
  const navigate = useNavigate();

  // const LoadMyBooks = ({ user, setUser, setMyBooks }) => {

  function LoadMyBooks({ user, setUser, setMyBooks }) {
    const { data, isSuccess } = useGetMeQuery();
    if (isSuccess) {
      console.log("entro a load my books");
      const result = JSON.parse(data);

      setUser(result);
      console.log("nuevos libros", result);
      setMyBooks(user.books);
      console.log("new books list", myBooks);
      navigate("/account");
    }
  }
  let success = false;
  const ChO = async () => {
    try {
      const id = book.id;

      dispatch(setToken({ token }));

      success = await bookTaken(id).unwrap();
      console.log("sux after taken es:", success);
      navigate("/account");
    } catch (err) {
      setErrM(err.data.message);
      console.log(err);
    }
  };

  //token && dispatch(setToken(tokenF(token)));

  if (!user) {
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
          <h4 className="hotpink">{book.title}</h4>
          <p className="author">{book.author}</p>
          <p className="desc">{book.description}</p>
        </div>
      </li>
    );
  } else {
    return (
      <li key={book.id} className="player-card">
        <img src={book.coverimage} alt={book.title} className="player-image" />
        <div className="player-details">
          <h4 className="hotpink">{book.title}</h4>
          <p className="author">{book.author}</p>
          <p className="desc">{book.description}</p>
          {book.available ? (
            <button className="btn btn-primary" onClick={ChO}>
              Check Out Book
            </button>
          ) : (
            <button className="btn btn-light " disabled>
              Not Available
            </button>
          )}

          {errM && (
            <div>
              <p className="space"></p>
              <p className="error">Error: {errM}</p>
            </div>
          )}
        </div>
      </li>
    );
  }
}
