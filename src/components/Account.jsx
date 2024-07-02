/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetMeQuery } from "./../api";

export default function Account() {
  const token = useSelector((state) => state.register.token);
  const message = useSelector((state) => state.register.message);
  const [result, setResult] = useState({});
  const { data, isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess) {
      const result = JSON.parse(data);
      setResult(result);
    }
  }, [isSuccess]);

  return (
    <div>
      <p>
        {" "}
        Welcome <h2 className="hotpink">{result.email}</h2>
      </p>
      {/* <p>Token</p>
      <p>{token}</p> */}
      <p>{message}</p>
      <p>{token}</p>

      {
        <ul>
          <li>{result.id}</li>
          <li>{result.email}</li>
          <li>{result.firstname}</li>
          <li>{result.lastname}</li>
          <li>{result.books}</li>
        </ul>
      }
    </div>
  );
}
