import { histo } from './../api'

const initialState = {
  commits_result: null,
  commits_loading: true,
  commits_error_response: {},
  authors_result: null,
  authors_loading: true,
  authors_error_response: {}
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === 'HISTO_COMMITS_LOADING') {
    newState.commits_loading = true;
  }
  if (action.type === 'HISTO_AUTHORS_LOADING') {
    newState.authors_loading = true;
  }
  if (action.type === 'HISTO_COMMITS_SUCCESS') {
    newState.commits_result = action.value;
    newState.commits_error_response = {};
    newState.commits_loading = false;
  }
  if (action.type === 'HISTO_AUTHORS_SUCCESS') {
    newState.authors_result = action.value;
    newState.authors_error_response = {};
    newState.authors_loading = false;
  }
  if (action.type === 'HISTO_COMMITS_ERROR') {
    newState.commits_result = null;
    newState.commits_error_response = action.value;
    newState.commits_loading = false;
  }
  if (action.type === 'HISTO_AUTHORS_ERROR') {
    newState.authors_result = null;
    newState.authors_error_response = action.value;
    newState.authors_loading = false;
  }
  return newState;
}

function getCommitsHisto(params) {
  return (dispatch) => {
    dispatch({ type: 'HISTO_COMMITS_LOADING' });
    params.type = "commits"
    return histo(params)
      .then(response => {
        dispatch(
          {
            type: 'HISTO_COMMITS_SUCCESS',
            value: response.data,
          }
        )
      })
      .catch(error => {
        dispatch(
          {
            type: 'HISTO_COMMITS_ERROR',
            value: error.response
          }
        )
      })
  }
}

function getAuthorsHisto(params) {
  return (dispatch) => {
    dispatch({ type: 'HISTO_AUTHORS_LOADING' });
    params.type = "authors"
    return histo(params)
      .then(response => {
        dispatch(
          {
            type: 'HISTO_AUTHORS_SUCCESS',
            value: response.data,
          }
        )
      })
      .catch(error => {
        dispatch(
          {
            type: 'HISTO_AUTHORS_ERROR',
            value: error.response
          }
        )
      })
  }
}

export default reducer
export {
  getCommitsHisto,
  getAuthorsHisto,
}
