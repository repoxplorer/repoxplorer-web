import { infos } from './../api'

const initialState = {
  result: null,
  loading: true,
  error_response: {}
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === 'INFOS_LOADING') {
    newState.loading = true;
  }
  if (action.type === 'INFOS_SUCCESS') {
    newState.result = action.value;
    newState.error_response = {};
    newState.loading = false;
  }
  if (action.type === 'INFOS_ERROR') {
    newState.result = null;
    newState.error_response = action.value;
    newState.loading = false;
  }
  return newState;
}

function getInfos(project_id) {
  return (dispatch) => {
    dispatch({ type: 'INFOS_LOADING' });
    return infos(project_id)
      .then(response => {
        dispatch(
          {
            type: 'INFOS_SUCCESS',
            value: response.data,
          }
        )
      })
      .catch(error => {
        dispatch(
          {
            type: 'INFOS_ERROR',
            value: error.response
          }
        )
      })
  }
}

export default reducer
export {
  getInfos
}
