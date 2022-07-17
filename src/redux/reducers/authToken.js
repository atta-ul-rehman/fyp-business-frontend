//import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
let defaultState = {
  authToken: "",
  LoginState: "",
};

let authToken = (state = defaultState, action) => {
  switch (action.type) {
    case "New_User": {
      let newState = { ...state };

      newState = {
        authToken: action.payload.authToken,
        LoginState: action.payload.LoginState,
      };
      //console.log(action.payload.LoginState);
      return newState;
    }
    case "LogOut": {
      let newState = { ...state };
      console.log("Logout");
      newState = {
        authToken: " ",
        LoginState: " ",
      };
      return newState;
    }
    default:
      return state;
  }
};

export default authToken;
