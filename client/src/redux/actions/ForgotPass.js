import { RESETPASS} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const forgotpassword = (formData) => async (dispatch) => {
    try {
        const { data } = await api.forgotpassword(formData);
        dispatch({ type: RESETPASS, data});
    } catch (error) {
        const {data} = error.response
        dispatch({ type: RESETPASS, data });
    }
};