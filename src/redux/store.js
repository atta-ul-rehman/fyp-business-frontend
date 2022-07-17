/*import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import cartReducer from "./reducers/cartReducer";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['selectedItems']
};

const rootReducer = combineReducers({
  cartReducer: persistReducer(persistConfig, cartReducer)
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
*/
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { authApi } from '../RTK-query/Authentication';
// import reducer from './reducers/index';

// const store = configureStore({
//   reducer: {
//     [authApi.reducerPath]: authApi.reducer,
//     reducer:reducer
//   },
//   middleware: getDefaultMiddleware({}).concat(authApi.middleware), // NOTE this addition
// });

// export default store;

import { createStore } from "redux";

import rootreducer from "./reducers/index";

export default function configureStore(initialState) {
  const store = createStore(rootreducer, initialState);
  return store;
}
