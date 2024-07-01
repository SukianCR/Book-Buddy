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
   <>
     <div className="center"><p className="legend" >Take a look into our book collection</p></div>

      <main>
      <div className="center" > 
        <ul className="all-books">
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
                    <h4 className="hotpink {
">{book.title}</h4>
                    <p className="author">{book.author}</p>
                    <p className="desc">{book.description}</p>
                    <p>{book.available}</p>
                  </div>
                </li>
              );
            })}
        </ul></div>
      </main>
      </>
  );
}
