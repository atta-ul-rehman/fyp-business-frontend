//import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
let defaultState = {
  LoginedUser: [],
};

let LoginedUser = (state = defaultState, action) => {
  switch (action.type) {
    case "Get_Logined": {
      let newState = { ...state };
      console.log("new-USer");
      newState = {
        LoginedUser: action.payload,
      };
      console.log(action.payload);
      return newState;
    }
    case "Delete_User": {
      let newState = { ...state };
      console.log("Logout");
      newState = {
        LoginedUser: "",
      };
      return newState;
    }
    default:
      return state;
  }
};

export default LoginedUser;
