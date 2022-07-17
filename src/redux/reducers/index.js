import { combineReducers } from "redux";

import authToken from "./authToken";
import BusinessOnline from "./BusinessOnline";
import LoginedUser from "./LoginedUser";

let reducers = combineReducers({
  authToken: authToken,
  LoginedUser: LoginedUser,
  BusinessOnline,BusinessOnline
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
