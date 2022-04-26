import {
  USER_LOGOUT,
  USER_SETUP_REQUEST,
  USER_SETUP_SUCCESS,
  USER_SETUP_FAILED,
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
