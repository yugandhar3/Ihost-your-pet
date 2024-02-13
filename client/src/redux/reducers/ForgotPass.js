import * as actionType from '../constants/actionTypes';

const initialState = { resetData: null ,validate:null}


const ForgotReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionType.RESETPASS:
            // state = { resetData: null ,validate:null}
            return {...state,resetData: action.data, validate: action.data };
        default:
            return state;
    }
};

export default ForgotReducer;