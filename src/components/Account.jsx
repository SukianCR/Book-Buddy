/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useEffect, useState } from "react";
import { useGetMeQuery } from "./../api";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./../api";

export default function Account() {
  const token = useSelector((state) => state.register.token);
  const message = useSelector((state) => state.register.message);
  //si llega hasta aca, falta desplegar la info
  console.log(token, message);

  const [user, setUser] = useState({});
  const { data, isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess) {
      const result = JSON.parse(data);

      setUser(result);
      //  console.log(user);
      console.log(result);
    }
  }, [isSuccess]);

  return (
    <div className="centro">
      <h4 className="space-m playwrite usr-email">{user.email}</h4>
    </div>
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
