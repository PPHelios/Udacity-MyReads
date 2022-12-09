import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, update } from "../BooksAPI";

const initialState = { allBooks: [], status: "idle", error: null };

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const data = await getAll();
  return data;
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    changeBookShelf: {
      reducer(state, action) {
        let book = action.payload.book;
        let newShelf = action.payload.newShelf;
        const id = action.payload.book.id;
        update(book, newShelf).catch((err) => {
          console.log(err);
          state.error = true;
        });
        if (!action.error) {
          const bookExists = state.allBooks.find((book) => book.id === id);
          if (bookExists) {
            if (newShelf === "none") {
              state.allBooks = state.allBooks.filter((book) => book.id !== id);
            } else {
              bookExists.shelf = newShelf;
            }
          } else if (!bookExists) {
            const newBook = { ...book, shelf: newShelf };
            state.allBooks = [...state.allBooks, newBook];
          }
        } else {
          console.log("error " + action.error);
        }
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allBooks = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("builder error: " + action.error.message);
      });
  },
});
export const allBooks = (state) => state.books.allBooks;
export const booksLoadingState = (state) => state.books.status;
export const booksError = (state) => state.books.error;
export const selectAllPosts = (state) => state.posts.posts;

export const { changeBookShelf } = booksSlice.actions;
export default booksSlice.reducer;
