const initialState = {
  from_date: null,
  to_date: null,
  include_merge_commits: null,
  query_params_updated: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === 'FROM_DATE_CHANGE') {
    newState.from_date = action.value;
  }
  if (action.type === 'TO_DATE_CHANGE') {
    newState.to_date = action.value;
  }
  if (action.type === 'IMC_CHANGE') {
    newState.include_merge_commits = action.value;
  }
  if (action.type === 'QUERY_PARAMS_UPDATED') {
    newState.query_params_updated = action.value;
  }
  return newState;
}

export default reducer
