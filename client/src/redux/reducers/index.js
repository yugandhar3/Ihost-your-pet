import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import ForgotReducer from './ForgotPass';
import BuckReducer from "./BuckPointsReducer";


export const reducers = combineReducers({ UserReducer,ForgotReducer,BuckReducer});