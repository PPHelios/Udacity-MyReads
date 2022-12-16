import { HomeShelf } from "./HomeShelf";
export const BookShelf = ({ booksShelfName, shelfName }) => {
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{booksShelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <HomeShelf shelfName={shelfName} />
          </ol>
        </div>
      </div>
    </div>
  );
};
