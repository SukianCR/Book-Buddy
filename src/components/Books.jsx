/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetBooksQuery } from "./../api";

export default function Books() {
  const [books, setBooks] = useState([]);

  // const { data, error,  isSuccess } = useGetUsersQuery();
  const { data, isSuccess } = useGetBooksQuery();

  useEffect(() => {
    if (isSuccess) {
      const result = JSON.parse(data);

      console.log(result.books);
      setBooks(result.books);
      console.log(books);
    }
  }, [isSuccess]);

  return (
    <div>
      <h2 className="hotpink">Books</h2>

      <main>
        <ul className="all_books">
          {isSuccess &&
            books.map((book) => {
              return (
                <li key={book.id} className="player-card">
                  <img
                    src={book.coverimage}
                    alt={book.title}
                    className="player-image"
                  />
                  <div className="player-details">
                    <p className="nameSh">{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.description}</p>
                    <p>{book.available}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      </main>
    </div>
  );
}
