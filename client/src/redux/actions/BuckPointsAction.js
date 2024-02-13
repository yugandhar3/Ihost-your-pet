import * as api from '../api/index.js';
import {BUCK_POINTS } from '../constants/actionTypes';
export const buckPoints = (id, buckData) => async (dispatch) => {
  console.log("action",id,buckData)
    try {
        const { data } = await api.requestBuckPoint(id,buckData);
        console.log("data action",data)
         dispatch({ type: BUCK_POINTS, data });
        
    } catch (error) {
        console.log(error);
    }
};