/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useState } from "react";

import BookList from "./BooksList";
import SelectedBook from "./SelectedBook";

export default function Books({ user, setUser, active, setActive, selectedBookId, setSelectedBookId }) {
  
  setActive("books");
  console.log("active es", active);
  return (
    <>
      {selectedBookId ? (
        <SelectedBook
          setSelectedBookId={setSelectedBookId}
          selectedBookId={selectedBookId}
          setActive={setActive}
          user={user}
        />
      ) : (
        <BookList setSelectedBookId={setSelectedBookId} user={user} />
      )}
    </>
  );
}
