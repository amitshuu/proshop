import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
//Product reducer
import {
  productDeatilsReducer,
  productListReducer,
} from './reducers/productReducer';

//Cart reducer

import { cartReducer } from './reducers/cartReducer';
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDeatilsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
