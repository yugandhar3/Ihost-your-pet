import { AUTH,UPDATEUSER } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  
    try {
        const { data } = await api.signIn(formData);
         dispatch({ type: AUTH, data });
        
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        router('/');
    } catch (error) {
        const {data} = error.response
        dispatch({ type: AUTH, data });
    }   
};
export const UpdateUser = (formData) => async (dispatch) => {
    try {
        const { data } = await api.profileUpdate(formData);
        localStorage.clear();
        localStorage.setItem('profile',JSON.stringify(data))
        dispatch({ type: UPDATEUSER, data });
    } catch (error) {
        const {data} = error.response;
        console.log(data);
        dispatch({ type: UPDATEUSER, data });
    }   
};


export const emailvalidate = (formData) => async (dispatch) => {
     try {
        const { data } = await api.emailvalidate(formData);
        dispatch({ type: AUTH, data });
    } catch (error) {
        const {data} = error.response
        dispatch({ type: AUTH, data });
    }
};