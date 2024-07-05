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
  setToken,
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
      console.log(result);
      //dispatch(setToken(token));
      //dispatch(setToken(isSuccess.token));
      //  dispatch(setToken({ token: token }));
    }
  }, [isSuccess, data]);

  setEmail(user.email);
  setMyBooks(user.books);

  // const returnBook = async (id) => {
  //   try {
  //     let success = false;

  //     success = await bookReturned(id).unwrap();

  //     if (success) {
  //       console.log("sux es:", success);
  //       navigate("/account");
  //     }
  //   } catch (err) {
  //     //   setErrM(err?.data?.message);
  //     console.log(err);
  //   }
  // };

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
                        <button className="btn btn-primary ">
                          Return Book
                        </button>
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
