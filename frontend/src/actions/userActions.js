import {
  USER_LOGOUT,
  USER_SETUP_REQUEST,
  USER_SETUP_SUCCESS,
  USER_SETUP_FAILED,
} from '../constants/userConstants';
import axios from 'axios';
export const setupUser =
  ({ currentUser, endpoint }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_SETUP_REQUEST });

      const { data } = await axios.post(endpoint, currentUser);
      dispatch({ type: USER_SETUP_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SETUP_FAILED, payload: error.response.data.msg });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};
