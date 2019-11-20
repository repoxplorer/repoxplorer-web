import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import statusReducer from './reducers/status';
import infosReducer from './reducers/infos';
import projectsReducer from './reducers/projects';
import filtersReducer from './reducers/filters';
import histosReducer from './reducers/histos';

function createMyStore() {

  const rootReducer = combineReducers({
    statusReducer: statusReducer,
    infosReducer: infosReducer,
    projectsReducer: projectsReducer,
    filtersReducer: filtersReducer,
    histosReducer: histosReducer,
  })

  return createStore(
    rootReducer, applyMiddleware(thunk))
}

export {
  createMyStore
}
