import { status } from './../api'

const initialState = {
  result: null,
  loading: true,
  error: {}
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === 'STATUS_LOADING') {
    newState.loading = true;
  }
  if (action.type === 'STATUS_SUCCESS') {
    newState.result = action.value;
    newState.error = {};
    newState.loading = false;
  }
  if (action.type === 'STATUS_ERROR') {
    newState.result = null;
    newState.error = action.value;
    newState.loading = false;
  }
  return newState;
}

function getStatus() {
  return (dispatch) => {
    dispatch({ type: 'STATUS_LOADING' });
    return status()
      .then(response => {
        dispatch(
          {
            type: 'STATUS_SUCCESS',
            value: response.data,
          }
        )
      })
      .catch(error => {
        dispatch(
          {
            type: 'STATUS_ERROR',
            value: error.response
          }
        )
      })
  }
}

export default reducer
export {
  getStatus
}
