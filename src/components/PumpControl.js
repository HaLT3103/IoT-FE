import React, { useState, useEffect } from "react";
import axios from "axios";

const PumpControl = () => {
  const [isPumpOn, setIsPumpOn] = useState(false); // Trạng thái máy bơm

  useEffect(() => {
    const fetchPumpState = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/data");
        const pumpState = response.data.pumpState;
        setIsPumpOn(pumpState === 1);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error.message);
      }
    };

    fetchPumpState();
  }, []);

  const togglePump = async () => {
    try {
      const newPumpState = !isPumpOn ? 1 : 0; // Đảo ngược trạng thái hiện tại
      const response = await axios.post(
        "http://localhost:3000/api/updatePumpState",
        { pumpState: newPumpState }
      );
      console.log("API Response:", response.data); // Log phản hồi từ API
      setIsPumpOn(!isPumpOn); // Cập nhật trạng thái trong component nếu API thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật umpState:", error.message); // Log lỗi nếu có
    }
  };

  return (
    <div className="pump-control">
      <h2>Trạng thái máy bơm: {isPumpOn ? "BẬT" : "TẮT"}</h2>
      <button onClick={togglePump}>{isPumpOn ? "Tắt" : "Bật"}</button>
    </div>
  );
};

export default PumpControl;
