// src/components/FanControl.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const FanControl = ({ fanState }) => {
  const [isFanOn, setIsFanOn] = useState(false);

  useEffect(() => {
    const fetchFanState = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/data");
        const fanState = response.data.fanState;
        setIsFanOn(fanState === 1);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error.message);
      }
    };
    fetchFanState();
  }, [fanState]);

  const toggleFan = async () => {
    try {
      const newFanState = !isFanOn ? 1 : 0; // Đảo ngược trạng thái hiện tại
      const response = await axios.post(
        "http://localhost:3000/api/updateFanState",
        { fanState: newFanState }
      );
      console.log("API Response:", response.data); // Log phản hồi từ API
      setIsFanOn(!isFanOn); // Cập nhật trạng thái trong component nếu API thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật fanState:", error.message); // Log lỗi nếu có
    }
  };

  return (
    <div className="fan-control">
      <h2>Trạng thái quạt: {isFanOn ? "BẬT" : "TẮT"}</h2>
      <button onClick={toggleFan}>{isFanOn ? "Tắt" : "Bật"}</button>
    </div>
  );
};

export default FanControl;
