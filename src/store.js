import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import statusReducer from './reducers/status';
import infosReducer from './reducers/infos';
import projectsReducer from './reducers/projects';

function createMyStore() {

  const rootReducer = combineReducers({
    statusReducer: statusReducer,
    infosReducer: infosReducer,
    projectsReducer: projectsReducer,
  })

  return createStore(
    rootReducer, applyMiddleware(thunk))
}

export {
  createMyStore
}
