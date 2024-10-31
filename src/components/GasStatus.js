import React, { useState, useEffect } from "react";
import axios from "axios";

const GasStatus = () => {
  const [gasValue, setGasValue] = useState(null);
  const [status, setStatus] = useState("safe");

  useEffect(() => {
    const fetchGasValue = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/data");
        const gasValue = response.data.gasValue;
        setGasValue(gasValue);

        if (gasValue > 100) {
          setStatus("danger");
        } else if (gasValue < 50) {
          setStatus("safe");
        } else {
          setStatus("warning");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error.message);
      }
    };

    fetchGasValue();
  }, []);

  return (
    <div className="card">
      <h2 className="label">Mức khí gas hiện tại: {gasValue} ppm</h2>
      <div className="sublabel">
        Trạng thái hệ thống:{" "}
        <span className={`status-${status.toLowerCase()}`}>{status}</span>
      </div>
    </div>
  );
};

export default GasStatus;
