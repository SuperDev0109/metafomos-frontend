import { combineReducers } from 'redux';
import blockchain from './blockchain';
import auth from './auth';
import profile from './profile';

export default combineReducers({
   blockchain,
   auth,
   profile
})