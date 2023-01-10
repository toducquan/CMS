// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import profile from './profile';
import building from './building';
import room from './room';
import manager from './manager';
import notification from './notification';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, notification, profile, building, manager, room });

export default reducers;
