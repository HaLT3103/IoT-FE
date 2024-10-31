import React, { useState, useEffect } from "react";
import axios from "axios";

const DataHistory = () => {
  const [dataHistory, setDataHistory] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/data");
        setDataHistory((prevHistory) => [...prevHistory, response.data]);
      } catch (error) {
        setError("Lỗi khi lấy dữ liệu từ server: " + error.message);
        console.error("Chi tiết lỗi:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const displayedData = showAll ? dataHistory : dataHistory.slice(-5).reverse();

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Lịch sử trạng thái</h2>
      {dataHistory.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={{ ...styles.th, ...styles.fanState }}>Fan State</th>
              <th style={{ ...styles.th, ...styles.fireState }}>Fire State</th>
              <th style={{ ...styles.th, ...styles.gasThreshold }}>
                Gas Threshold
              </th>
              <th style={{ ...styles.th, ...styles.gasValue }}>Gas Value</th>
              <th style={{ ...styles.th, ...styles.pumpState }}>Pump State</th>
              <th style={{ ...styles.th, ...styles.windowState }}>
                Window State
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((data, index) => (
              <tr key={index}>
                <td style={styles.fanState}>{data.fanState}</td>
                <td style={styles.fireState}>{data.fireState}</td>
                <td style={styles.gasThreshold}>{data.gasThreshold}</td>
                <td style={styles.gasValue}>{data.gasValue}</td>
                <td style={styles.pumpState}>{data.pumpState}</td>
                <td style={styles.windowState}>{data.windowState}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.loadingText}>Đang tải dữ liệu...</p>
      )}
      {dataHistory.length > 5 && (
        <button onClick={() => setShowAll(!showAll)} style={styles.button}>
          {showAll ? "Ẩn bớt" : "Xem tất cả"}
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  headerRow: {
    backgroundColor: "#333",
    color: "#000",
  },
  th: {
    padding: "10px",
    border: "1px solid #ddd",
    fontWeight: "bold",
  },
  fanState: {
    backgroundColor: "#ffcccc",
    textAlign: "center",
  },
  fireState: {
    backgroundColor: "#ffe6cc",
    textAlign: "center",
  },
  gasThreshold: {
    backgroundColor: "#ffffcc",
    textAlign: "center",
  },
  gasValue: {
    backgroundColor: "#e6ffcc",
    textAlign: "center",
  },
  pumpState: {
    backgroundColor: "#cce6ff",
    textAlign: "center",
  },
  windowState: {
    backgroundColor: "#e6ccff",
    textAlign: "center",
  },
  loadingText: {
    textAlign: "center",
    color: "#888",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    textAlign: "center",
  },
};

export default DataHistory;
