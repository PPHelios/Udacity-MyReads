import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";
import searchSlice from "./searchSlice";
import detailedViewSlice from "./detailedViewSlice";

export default configureStore({
  reducer: {
    books: booksSlice,
    search: searchSlice,
    detailedView: detailedViewSlice,
  },
});
