import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { search } from "../BooksAPI";

const initialState = {
  searchValue: "",
  searchResults: [],
  status: "idle",
  error: null,
};

export const fetchSearchResults = createAsyncThunk(
  "search/fetchresults",
  async (searchWord) => {
    const data = await search(searchWord.trim());
    return data;
  }
);

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    newSearch: {
      reducer(state, action) {
        if (action.payload.searchValue !== "") {
          state.searchValue = action.payload.searchValue;
        }
      },
    },
    clearSearch: {
      reducer(state, action) {
        state.searchValue = "";
        state.searchResults = [];
        state.error = null;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSearchResults.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload !== undefined) {
          if (action.payload.error) {
            console.log(action.payload);
            state.error = action.payload.error;
          } else {
            state.error = null;
            state.searchResults = action.payload;
          }
        }
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("builder error: " + action.error.message);
      });
  },
});
export const searchAllBooks = (state) => state.search.searchResults;
export const searchError = (state) => state.search.error;
export const loadingState = (state) => state.search.status;
export const { newSearch, clearSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
