import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, isLoading: true };
    case PRODUCT_LIST_SUCCESS:
      return { isLoading: false, products: action.payload };
    case PRODUCT_LIST_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeatilsReducer = (
  state = { singleProduct: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { isLoading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { isLoading: false, singleProduct: action.payload };
    case PRODUCT_DETAILS_FAILED:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
