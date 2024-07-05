/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetBooksQuery } from "./../api";
import BookLi from "./BookLi";

export default function BooksList({ setSelectedBookId, user, token, setToken }) {
  const [books, setBooks] = useState([]);
  const { data, isSuccess } = useGetBooksQuery();

  useEffect(() => {
    if (isSuccess) {
      const result = JSON.parse(data);

      setBooks(result.books);
      
    }
  }, [isSuccess]);

  return (
    <>
      <div className="center">
        <p className="legend-books">Take a look into our book collection</p>
      </div>
      <main>
        <div className="center">
          <ul className="all-books">
            {isSuccess &&
              books.map((book) => {
                return (
                  <BookLi
                    key={book.id}
                    setSelectedBookId={setSelectedBookId}
                    book={book}
                    user={user} 
                    token={token}
                    setToken={setToken}
                  />
                );
              })}
          </ul>
        </div>
      </main>
    </>
  );
}
