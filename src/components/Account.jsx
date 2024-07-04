/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./../api";
import { useGetMeQuery } from "./../api";
import { useGetMeBooksQuery } from "./../api";

export default function Account({ user, setUser, setEmail }) {
 
  


  const token = useSelector((state) => state.register.token);

  //const [meBooks, setMeBooks] = useState([]);
  const { data, isSuccess } = useGetMeQuery();
  // const { dataMeBooks, isSuccessMeBooks } = useGetMeBooksQuery();

  useEffect(() => {
    if (isSuccess) {
      const result = JSON.parse(data);

      setUser(result);
     
    }
  }, [isSuccess, data]);

  console.log("viene user", user);
  setEmail(user.email);
  //   if (isSuccessMeBooks) {
  //     const resultMeBooks = JSON.parse(dataMeBooks);
  //     setMeBooks(resultMeBooks);
  //   }
  // }, [isSuccess, isSuccessMeBooks, data, dataMeBooks]);

  // console.log("user es", user.email);

  // console.log("user books son ", meBooks);

  return (
    <>
      <div className="centro">
        <h4 className="space-m playwrite usr-email">{user.email}</h4>{" "}
      </div>
      {/* <div className="centro">
        {meBooks.length > 0 &&
          meBooks.map((book) => {
            return <p key={book.id}> {book.title} </p>;
          })}
      </div> */}
    </>
  );
}

// const getMe = async () => {
//   try {
//     let success = false;
//     success = await getMeUser().unwrap();
//     if (success) {
//       console.log(success);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// getMe();
