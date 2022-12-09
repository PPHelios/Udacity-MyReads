import { useSelector } from "react-redux";
import { allBooks } from "../redux/booksSlice";
import { searchAllBooks, searchError } from "../redux/searchSlice";
import { Book } from "./Book";

export const SearchShelf = () => {
  const allHomeBooks = useSelector(allBooks);
  const searchResults = useSelector(searchAllBooks);
  const error = useSelector(searchError);

  const SearchBooks = () => {
    const updatedBooks = searchResults.map((book) => {
      allHomeBooks.map((b) => {
        if (b.id === book.id) {
          book = { ...book, shelf: b.shelf };
        }
        return b;
      });
      return book;
    });

    if (error) {
      return <h4 className="error">{error}</h4>;
    } else if (updatedBooks.length > 1) {
      return updatedBooks.map((book) => <Book book={book} key={book.id} />);
    } else {
      return <h4>Search for Something...</h4>;
    }
  };

  return <SearchBooks />;
};
