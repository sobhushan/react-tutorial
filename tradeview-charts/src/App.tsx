// // src/App.tsx
// import React, { useState } from "react";
// import Chart from "./components/Chart";
// import FileUpload from "./components/FileUpload";
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import "./App.css";

// const App: React.FC = () => {
//   const [chartData, setChartData] = useState<any[]>([]);

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
//       <h1 className="text-center fw-bold mb-4 mt-5">TradingView Lightweight Chart</h1>
//       <FileUpload onFileLoaded={setChartData} />
//       <div className="w-11/12 h-[500px] bg-white shadow-lg rounded-lg">
//         <Chart data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default App;


//================================================

import React, { useState } from "react";
import Chart from "./components/Chart";
import FileUpload from "./components/FileUpload";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: "rgba(35, 160, 152)" }}>
      <h1 className="text-center fw-bold mb-3 mt-2">TradingView Lightweight Chart</h1>
      <FileUpload onFileLoaded={setChartData} />
      <div className="w-100 mb-1" style={{ height: "550px" }}>
        <Chart data={chartData} />
      </div>
    </div>
  );
};

export default App;
