import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { isLoading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { isLoading: false, products: action.payload };
    case PRODUCT_LIST_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};