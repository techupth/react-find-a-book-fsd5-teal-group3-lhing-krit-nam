import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // !!ทำและเรียนรู้ตามเฉลย ต้องกลับมาทบทวน!!
  // useState ของ Input ที่จะเสิร์ชหาหนังสือ
  const [inputMessage, setInputMessage] = useState("");
  // usestate ของ booklist ที่แสดงผลหลังเสิร์ช
  const [bookList, setBookList] = useState([]);
  //ฟังก์ชันสำหรับดึงข้อมูลจาก server
  // function รับ parameter "text" เพื่อมาเสิร์ชหาข้อมูลที่ตรงกับสิ่งที่พิมพ์
  const getBook = async (text) => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );
      // รับเป็น items เพราะข้อมูลที่เราต้องการ ข้อมูลจาก key "items"
      setBookList(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // สร้าง Request ด้วย Axios ทุกครั้งเมื่อ inputState เปลี่ยน
    if (inputMessage) {
      getBook(inputMessage);
    }
  }, [inputMessage]);
  return (
    <div className="App">
      {/* start coding here */}
      <h1>Find a Book</h1>
      <input
        type="text"
        onChange={(event) => {
          setInputMessage(event.target.value);
        }}
        value={inputMessage}
      />
      <div className="book-list-state">
        {bookList.map((item, index) => {
          return (
            <div className="book-list" key={index}>
              <li>{item.volumeInfo.title}</li>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
