import { createSlice } from "@reduxjs/toolkit";

const detailedView = createSlice({
  name: "detailedView",
  initialState: { viewState: false, bookInView: {} },
  reducers: {
    changeDetailedView: {
      reducer(state, action) {
        return (state = {
          viewState: !state.viewState,
          bookInView: action.payload.book,
        });
      },
    },
  },
});

export const detailedViewState = (state) => state.detailedView.viewState;
export const detailedViewBook = (state) => state.detailedView.bookInView;
export const { changeDetailedView } = detailedView.actions;
export default detailedView.reducer;
