/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./../api";
import { useGetMeQuery } from "./../api";

import { useNavigate } from "react-router-dom";
import { useReturnBookMutation } from "../api";

export default function Account({
  user,
  setUser,
  setEmail,
  myBooks,
  setMyBooks,
  token,
}) {
  // const token2 = useSelector((state) => state.register.token);

  const { data, isSuccess } = useGetMeQuery();
  const navigate = useNavigate();
  const [bookReturned] = useReturnBookMutation();
  const [errM, setErrM] = useState();
  const dispatch = useDispatch();

  console.log("token en account es", token);
  useEffect(() => {
    if (isSuccess) {
      const result = JSON.parse(data);

      setUser(result);
      console.log("nuevo user es", result);
     
    }
  }, [isSuccess, data]);

  setEmail(user.email);
  setMyBooks(user.books);
  console.log(myBooks);

  const rBO = (id) => {
    console.log("book id", id);
    // try {
    //   let success = false;
    //   console.log("entro a rb y token es", token);
    //   dispatch(setToken({ token }));

    //   success = await bookReturned(id).unwrap();
    //   console.log("token en account", token);

    //   console.log("viene de return book", success);
    //   setMyBooks(myBooks);
    //   navigate("/account");
    //   if (success) {
    //     console.log("si lo devolvio");
    //   }
    // } catch (err) {
    //   //setErrM(err.data.message);
    //   console.log(err);
    // }
  };

  return (
    <>
      <div className="centro columna">
        <p className="space-m playwrite usr-email">{user.email}</p>
        <section>
          <main>
            <div className="center">
              <ul className="all-books">
                {myBooks?.map((book) => {
                  return (
                    <li key={book.id} className="player-card">
                      <img
                        src={book.coverimage}
                        alt={book.title}
                        className="player-image"
                      />
                      <div className="player-details">
                        <h4 className="hotpink">{book.title}</h4>
                        <p className="author">{book.author}</p>
                        <p className="desc ">{book.description}</p>
                        <p className="space-s"></p>
                        {user && (
                          <button
                            className="btn btn-primary"
                            onClick={rBO(book.id)}
                          >
                            Return Book
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              {errM && (
                <div>
                  <p className="space"></p>
                  <p className="error">{errM}</p>
                </div>
              )}
            </div>
          </main>
        </section>
      </div>
    </>
  );
}
