import {
  USER_LOGOUT,
  USER_SETUP_REQUEST,
  USER_SETUP_SUCCESS,
  USER_SETUP_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_RESET,
} from '../constants/userConstants';

export const userSetupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SETUP_REQUEST:
      return { isLoading: true };
    case USER_SETUP_SUCCESS:
      return { isLoading: false, userInfo: action.payload };
    case USER_SETUP_FAILED:
      return { isLoading: false, error: action.payload };
    case USER_LOGOUT:
      return { userInfo: null };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case USER_DETAILS_SUCCESS:
      return { isLoading: false, user: action.payload };
    case USER_DETAILS_FAILED:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { isLoading: true };
    case USER_UPDATE_SUCCESS:
      return { isLoading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_FAILED:
      return { isLoading: false, success: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
