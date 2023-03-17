import React from "react";
import { useEffect, useState,useContext } from "react";
import { BookContext } from "../../Context/BookContext";
import "./timeline.scss";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Update the document title using the browser API
    // console.log("on load");
    async function callBooks() {
      try {
        const resp = await api.getAllBooks();
        if (resp.ok) {
          setAllBooks(resp.data);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }
    callBooks();
    console.log("book data",bookData);
  }, []);

  const handleBookDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  const showBooks = allBooks.map((book) => {
    return (
      <ul
        key={book.id}
        onClick={() => handleBookDetail(book._id)}
        className="book_list"
      >
        <li className="book">
          <div>
            <img src={book.image} alt={book.title} />
          </div>
          <div>
            <h4 className="title">{book.title}</h4>
            <div className="subtitle">
              <p className="details">
                <span>Authors:</span>
                <span>{...book.authors}</span>
                <span>Genre:</span>
                <span>{book.genre}</span>
                <span>Pages:</span>
                <span>{book.pageCount}</span>
              </p>
            </div>
            <p className="synopsis">Synopsis:</p>
            <p className="description">{book.description}</p>
          </div>
        </li>
      </ul>
    );
  });

  return (
    <div className="timeline_wrapper">
      <div className="left container">{showBooks}</div>
      <div className="right">
        <div className="filter_wrapper">
          <p>Filter Genre</p>
          <ul>
            <li>Fiction</li>
            <li>Romance</li>
            <li>Romcom</li>
            <li>Thriller</li>
            <li>Fantasy</li>
          </ul>
          <button>Filter Books</button>
        </div>
      </div>
    </div>
  );
};

export default index;
