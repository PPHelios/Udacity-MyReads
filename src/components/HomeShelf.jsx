import { useSelector } from "react-redux";
import { allBooks } from "../redux/booksSlice";
import { Book } from "./Book";

export const HomeShelf = ({ shelfName }) => {
  const allHomeBooks = useSelector(allBooks);

  const HomeBooks = () => {
    return allHomeBooks
      .filter((book) => book.shelf === shelfName)
      .map((book) => <Book book={book} key={book.id} />);
  };

  return <>{allHomeBooks ? <HomeBooks /> : <h4>nodata</h4>}</>;
};
