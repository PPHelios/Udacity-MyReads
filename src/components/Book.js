import { useState } from "react";
import { BookShelfChanger } from "./BookShelfChanger";
import { DetailedBook } from "./DetailedBook";
export const Book = ({ book }) => {
  const [detailedViewOn, setDetailedViewOn] = useState(false);
  const handleDetailedViewToggle = () => setDetailedViewOn(!detailedViewOn);
  return (
    <>
      <li>
        <div className="book">
          <div className="book-top">
            <button className="close--btn" onClick={handleDetailedViewToggle}>
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
          <button className="close--btn" onClick={handleDetailedViewToggle}>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book?.authors}</div>
          </button>
        </div>
      </li>

      {detailedViewOn && (
        <DetailedBook
          book={book}
          handleDetailedViewToggle={handleDetailedViewToggle}
        />
      )}
    </>
  );
};
