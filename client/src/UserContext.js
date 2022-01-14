import { createContext } from "react";

const UserContext = createContext({
  authUser: undefined,
  setAuthUser: (auth) => {}
});

export default UserContext;