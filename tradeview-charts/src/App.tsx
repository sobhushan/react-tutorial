// src/App.tsx
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Chart from "./components/Chart";

const chartOptions = ["Candlestick", "Line", "Histogram"];

const App: React.FC = () => {
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleFileUpload = (data: any[]) => {
    setChartData(data);
  };

  const handleCheckboxChange = (chartType: string) => {
    setSelectedCharts((prev) =>
      prev.includes(chartType)
        ? prev.filter((item) => item !== chartType) // Remove if unchecked
        : [...prev, chartType] // Add if checked
    );
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: "rgba(35, 160, 152)" }}>
      <h1 className="text-center fw-bold mb-3 mt-2">TradingView Lightweight Chart</h1>

      {/* File Upload Component */}
      <FileUpload onFileLoaded={handleFileUpload} />

      {/* Dropdown with checkboxes */}
      <div className="mb-3">
        <label>Select Charts:</label>
        <div>
          {chartOptions.map((option) => (
            <label key={option} className="d-block">
              <input
                type="checkbox"
                checked={selectedCharts.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Render Chart if Data is Available */}
      {chartData.length > 0 ? (
        <Chart data={chartData} selectedCharts={selectedCharts} />
      ) : (
        <p className="text-muted">Upload a CSV file to display charts.</p>
      )}
    </div>
  );
};

export default App;





//================================================

// import React, { useState } from "react";
// import Chart from "./components/Chart";
// import FileUpload from "./components/FileUpload";
// import "bootstrap/dist/css/bootstrap.min.css";

// const App: React.FC = () => {
//   const [chartData, setChartData] = useState<any[]>([]);

//   return (
//     <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: "rgba(35, 160, 152)" }}>
//       <h1 className="text-center fw-bold mb-3 mt-2">TradingView Lightweight Chart</h1>
//       <FileUpload onFileLoaded={setChartData} />
//       <div className="w-100 mb-1" style={{ height: "550px" }}>
//         <Chart data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default App;
