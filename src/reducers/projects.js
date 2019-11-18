import { projects } from './../api'

const initialState = {
  result: null,
  loading: true,
  error: {}
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === 'PROJECTS_LOADING') {
    newState.loading = true;
  }
  if (action.type === 'PROJECTS_SUCCESS') {
    newState.result = action.value;
    newState.error = {};
    newState.loading = false;
  }
  if (action.type === 'PROJECTS_ERROR') {
    newState.result = null;
    newState.error = action.value;
    newState.loading = false;
  }
  return newState;
}

function getProjects(project_id) {
  return (dispatch) => {
    dispatch({ type: 'PROJECTS_LOADING' });
    return projects(project_id)
      .then(response => {
        dispatch(
          {
            type: 'PROJECTS_SUCCESS',
            value: response.data,
          }
        )
      })
      .catch(error => {
        dispatch(
          {
            type: 'PROJECTS_ERROR',
            value: error.response
          }
        )
      })
  }
}

export default reducer
export {
  getProjects
}
