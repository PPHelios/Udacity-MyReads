import { BookShelfChanger } from "./BookShelfChanger";
import { useDispatch } from "react-redux";
import { changeDetailedView } from "../redux/detailedViewSlice";
export const Book = ({ book }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <button className="detailed-btn" onClick={() => dispatch(changeDetailedView({ book }))}>
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book?.imageLinks?.smallThumbnail})`,
              }}
            ></div>
          </button>
          <BookShelfChanger book={book} />
        </div>
        <button className="detailed-btn" onClick={() => dispatch(changeDetailedView({ book }))}>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book?.authors}</div>
        </button>
      </div>
      
    </li>
  );
};
