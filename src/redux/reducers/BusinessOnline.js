//import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
let defaultState = {
    BusinessOnline: [],
  };
  
  let BusinessOnline = (state = defaultState, action) => {
    switch (action.type) {
      case "Set_BusinessOnline": {
        let newState = { ...state };
       // console.log(action.payload);
        newState = {
          BusinessOnline: [action.payload],
        };
       // console.log(action.payload);
        return newState;
      }
      default:
        return state;
    }
  };
  
  export default BusinessOnline;
  