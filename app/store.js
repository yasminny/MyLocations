import {createStore, combineReducers} from 'redux';
import categories from './reducers/categories';
import locations from './reducers/locations';

const reducer = combineReducers({
  categories,
  locations
});

const store = createStore(reducer);

export default store;
