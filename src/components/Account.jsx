/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetMeQuery } from "./../api";

export default function Account() {
  const token = useSelector((state) => state.register.token);
  const message = useSelector((state) => state.register.message);

  const { data, isSuccess } = useGetMeQuery();
  const [user, setUser] = useState({});

  console.log("el data es" + data);

  const result = JSON.parse(data);
  // console.log(result);
  // console.log("books " + result.books);

  return (
    <div>
      <h2 className="hotpink">My account</h2>
      <p>Token</p>
      <p>{token}</p>

      <p>{message}</p>
      <ul>
        <li>{result.id}</li>
        <li>{result.email}</li>
        <li>{result.firstname}</li>
        <li>{result.lastname}</li>
        <li>{result.books}</li>
      </ul>
    </div>
  );
}
