import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BookShelf } from "../components/BookShelf";
import { DetailedBook } from "../components/DetailedBook";
import { Spinner } from "../components/Spinner";
import { fetchBooks, booksLoadingState, booksError } from "../redux/booksSlice";
import {
  detailedViewState,
  detailedViewBook,
} from "../redux/detailedViewSlice";

export const HomePage = () => {
  const dispatch = useDispatch();
  const loadingState = useSelector(booksLoadingState);
  const error = useSelector(booksError);
  const detailedViewOn = useSelector(detailedViewState);
  const detailedBook = useSelector(detailedViewBook);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const Shelfes = () => {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf
              booksShelfName="Currently Reading"
              shelfName="currentlyReading"
              home="home"
            />
            <BookShelf
              booksShelfName="Want To Read"
              shelfName="wantToRead"
              home="home"
            />
            <BookShelf
              booksShelfName="Finished Reading"
              shelfName="read"
              home="home"
            />
            <Link to="/search">
              <div className="open-search"></div>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {error ? (
        <h2 className="error">{error}</h2>
      ) : loadingState === "loading" ? (
        <Spinner text="Loading..." />
      ) : !detailedViewOn ? (
        <Shelfes />
      ) : (
        <DetailedBook book={detailedBook} />
      )}
    </>
  );
};
