const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "FETCH_CITY") {
    return { ...state, searchResult: action.payload, loading: false };
  }
  if (action.type === "SELECT_CITY") {
    return {
      ...state,
      city: {
        name: action.payload.name,
        state: action.payload.state,
        country: action.payload.country,
      },
    };
  }
  if (action.type === "ERROR") {
    return { ...state, error: true, loading: false };
  }
};

export default reducer;
