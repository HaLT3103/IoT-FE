import React, { useState, useEffect } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import FanControl from "./components/FanControl";
import PumpControl from "./components/PumpControl";
import WindowControl from "./components/WindowControl";
import FireDetection from "./components/FireDetection";
import GasThresholdAdjuster from "./components/GasThresholdAdjuster";
import DataHistory from "./components/DataHistory";
import GasStatus from "./components/GasStatus";
import "./styles.css";

const App = () => {
  const [user, setUser] = useState(null); // Lưu trữ thông tin người dùng
  const [isRegistering, setIsRegistering] = useState(false); // Trạng thái đăng ký

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser); // Cập nhật người dùng khi đăng nhập thành công
  };

  const handleLogout = () => {
    setUser(null); // Reset user state
  };

  const handleRegister = (registeredUser) => {
    setUser(registeredUser); // Cập nhật người dùng khi đăng ký thành công
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
  };

  const [gasThreshold, setGasThreshold] = useState(50); // Ngưỡng khí gas mặc định

  const handleThresholdChange = (newThreshold) => {
    setGasThreshold(newThreshold);
  };

  const handleDataUpdate = (newGasStatus) => {
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: [...prev.datasets[0].data, newGasStatus].slice(-7), // Giữ 7 giá trị gần nhất
        },
      ],
    }));
  };

  return (
    <div className="container">
      {user ? (
        <>
          <Logout onLogout={handleLogout} />
          <h1 className="header">Hệ thống phát hiện rò rỉ khí ga</h1>
          <div className="dashboard">
            <div className="GasFire">
              <GasStatus
                onDataUpdate={handleDataUpdate}
                threshold={gasThreshold}
              />
              <FireDetection />
            </div>
            <GasThresholdAdjuster onThresholdChange={handleThresholdChange} />
            <div className="controls-container">
              <FanControl />
              <PumpControl />
              <WindowControl />
            </div>
            <DataHistory />
          </div>
        </>
      ) : (
        <>
          {isRegistering ? (
            <Register onRegister={handleRegister} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
          <button onClick={toggleAuthMode}>
            {isRegistering
              ? "Đã có tài khoản? Đăng nhập"
              : "Chưa có tài khoản? Đăng ký"}
          </button>
        </>
      )}
    </div>
  );
};

export default App;
