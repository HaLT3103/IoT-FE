import React, { useState, useEffect } from "react";
import axios from "axios";

const FireDetection = () => {
  const [isFireDetected, setIsFireDetected] = useState(false);

  useEffect(() => {
    const fetchFireState = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/data");
        const fireState = response.data.fireState;
        setIsFireDetected(fireState === 1);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error.message);
      }
    };

    fetchFireState();

    const interval = setInterval(fetchFireState, 5000); // Kiểm tra mỗi 5 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fire-detection-container">
      <h2>Phát hiện lửa</h2>
      <div className={`status ${isFireDetected ? "fire" : "no-fire"}`}>
        {isFireDetected ? "Có lửa" : "Không có lửa"}
      </div>
    </div>
  );
};

export default FireDetection;
