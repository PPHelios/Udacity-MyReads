import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { SearchShelf } from "../components/SearchShelf";
import { DebounceInput } from "react-debounce-input";
import {
  newSearch,
  clearSearch,
  fetchSearchResults,
  loadingState,
} from "../redux/searchSlice";
import { DetailedBook } from "../components/DetailedBook";
import { Spinner } from "../components/Spinner";
import {
  detailedViewState,
  detailedViewBook,
} from "../redux/detailedViewSlice";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const loadingStatus = useSelector(loadingState);
  const detailedViewOn = useSelector(detailedViewState);
  const detailedBook = useSelector(detailedViewBook);

  const handleSearch = (e) => {
    let params = { s: e.target.value };
    setSearchParams(params);
    setSearchValue(e.target.value);
  };
  const dispatchActions = () => {
    dispatch(newSearch({ searchValue }));
    dispatch(fetchSearchResults(searchValue));
  };
  useEffect(() => {
    let s = searchParams.get("s");
    if (searchValue === "") {
      if (s) {
        setSearchValue(s);
      }
      dispatch(clearSearch());
    } else if (searchValue !== "") {
      dispatchActions();
    }
  }, [searchValue, dispatch]);

  const SearchWindow = () => {
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <div className="close-search"></div>
            </Link>
            <div className="search-books-input-wrapper">
              <DebounceInput
                debounceTimeout={300}
                onChange={handleSearch}
                value={searchValue}
                type="text"
                placeholder="Search by title, author, or ISBN"
                autoFocus
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {loadingStatus === "loading" ? (
                <Spinner />
              ) : (
                <SearchShelf shelfName="none" key={1} />
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  };

  return !detailedViewOn ? (
    <SearchWindow />
  ) : (
    <DetailedBook book={detailedBook} />
  );
};
