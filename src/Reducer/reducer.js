const intialState = [];
function reducer(state = intialState, action) {
  switch (action.type) {
    case "addQuestion": {
      return [...state, action.val]
      ;
    }
    default:
      return state;
  }
  console.log(state);
}
export default reducer;
