import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import magnifying from "./icons/magnifying_icon.svg";

export default function App() {
  const [bookList, setBookList] = useState([]);
  const [searchText, setSearchText] = useState("");

  // const getBookData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
  //     );
  //     console.log(response);
  //     setBookList(response.data.items);
  //   } catch (error) {
  //     console.log("ERROR จ้าาา");
  //   }
  // };

  const inputSearchText = (event) => {
    setSearchText(event.target.value);
    getDataList();
  };

  // สร้าง useEffect เพื่อมา execute การดึงข้อมูลจากเซิฟเวอร์ = Fetch API
  // useEffect(() => {
  //   getBookData();
  // }, []);

  useEffect(() => {
    const getDataList = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
        );
        setBookList(response.data.items);
      } catch (error) {
        console.log("ERROR จ้าาา");
      }
    };
    if (searchText !== "") {
      getDataList();
    } else {
      setBookList([]);
    }
  }, [searchText]);

  return (
    <div className="App">
      {/* start coding here */}
      <h1>Find a Book</h1>
      <div className="search-box">
        <img className="icon" src={magnifying} alt="magnify-icon" />
        <label className="enter-text">
          <input
            type="text"
            placeholder="search..."
            className="input-search"
            onChange={inputSearchText}
            value={searchText}
          />
        </label>
        <button type="submit" className="submit-button">
          มีปุ่มไว้สวยๆ
        </button>
      </div>

      <div className="book-list">
        {bookList.map((item, index) => {
          return (
            <ul key={index}>
              <li>{item.volumeInfo.title}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
