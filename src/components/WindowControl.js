// src/components/WindowControl.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const WindowControl = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false); // Trạng thái cửa sổ, mặc định là đóng

  useEffect(() => {
    const fetchWindowState = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/data");
        const windowState = response.data.windowState;
        setIsWindowOpen(windowState === 1);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error.message);
      }
    };
    fetchWindowState();
  }, []);

  const toggleWindow = async () => {
    try {
      const newWindowState = !isWindowOpen ? 1 : 0; // Đảo ngược trạng thái hiện tại
      const response = await axios.post(
        "http://localhost:3000/api/updateWindowState",
        { windowState: newWindowState }
      );
      console.log("API Response:", response.data); // Log phản hồi từ API
      setIsWindowOpen(!isWindowOpen); // Cập nhật trạng thái trong component nếu API thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật fanState:", error.message); // Log lỗi nếu có
    }
  };

  return (
    <div className="window-control">
      <h2>Trạng thái cửa sổ: {isWindowOpen ? "MỞ" : "ĐÓNG"}</h2>
      <button onClick={toggleWindow}>{isWindowOpen ? "Đóng" : "Mở"}</button>
    </div>
  );
};

export default WindowControl;
