import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import statusReducer from './reducers/status';
import infosReducer from './reducers/infos';
import projectsReducer from './reducers/projects';
import filtersReducer from './reducers/filters';

function createMyStore() {

  const rootReducer = combineReducers({
    statusReducer: statusReducer,
    infosReducer: infosReducer,
    projectsReducer: projectsReducer,
    filtersReducer: filtersReducer,
  })

  return createStore(
    rootReducer, applyMiddleware(thunk))
}

export {
  createMyStore
}
