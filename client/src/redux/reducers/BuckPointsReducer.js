import * as actionType from '../constants/actionTypes';

const BuckReducer = (state = { buckData: null }, action) => {
    console.log("reducer", action)
    switch (action.type) {
        case actionType.BUCK_POINTS:
            return { ...state, buckData: action.data };
        default:
            return state;
    }
};

export default BuckReducer;