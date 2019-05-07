const intialState = {
  number: 5
};

export const numberReducer = (state = intialState, action) => {
  switch (action.type) {
    case "INCREASE_NUMBER":
      // state.number = state.number + 1;
      // return state;
      return { ...state, number: state.number + 1 };

    default:
      return {
        ...state
      };
  }
};
