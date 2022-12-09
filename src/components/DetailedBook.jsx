import { useDispatch } from "react-redux";
import { changeDetailedView } from "../redux/detailedViewSlice";
export const DetailedBook = ({ book }) => {
  const dispatch = useDispatch();
  const handleExit = () => {
    dispatch(changeDetailedView({}));
  };
  return (
    <div className="book--bg">
      <div className="book--window">
        <button
          onClick={handleExit}
          className="close-search details-window-arrow"
        ></button>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book?.imageLinks?.smallThumbnail})`,
            }}
          ></div>
        </div>
        <div className="book-details">
          <div>
            <span className="book-info-span">Book Title: </span>
            {book.title}
          </div>
          <div>
            <span className="book-info-span">Book Author: </span>{" "}
            {book?.authors}
          </div>
          <div>
            <span className="book-info-span">Published Date: </span>{" "}
            {book?.publishedDate}
          </div>
          <div>
            <span className="book-info-span">Publisher: </span>{" "}
            {book?.publisher}
          </div>
        </div>
      </div>
    </div>
  );
};
