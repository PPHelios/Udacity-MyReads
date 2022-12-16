import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeBookShelf } from "../redux/booksSlice";
export const BookShelfChanger = ({ book }) => {
  const [currentShelf, setCurrentShelf] = useState(book.shelf);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const newShelf = e.target.value;
    setCurrentShelf(newShelf);
    dispatch(changeBookShelf({ book, newShelf }));
  };

  return (
    <div className="book-shelf-changer">
      <select
        onChange={handleChange}
        value={currentShelf ? currentShelf : "none"}
      >
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none" default>
          None
        </option>
      </select>
    </div>
  );
};
