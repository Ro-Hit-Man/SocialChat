import { createStore, combineReducers } from 'redux';
import { isLogin } from "../Reducers/LoginReducer";
import { isDone } from "../Reducers/ChatReducer";
import { isCID } from '../Reducers/CidReducer';
import { isRID } from '../Reducers/RidReducer';

var rootReducer = combineReducers({isLogin,isDone,isCID,isRID});

var Store = createStore(rootReducer);

export default Store;