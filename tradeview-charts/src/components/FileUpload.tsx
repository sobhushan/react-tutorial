// // src/components/FileUpload.tsx
// import React from "react";

// interface FileUploadProps {
//   onFileLoaded: (data: any[]) => void;
// }

// const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded }) => {
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const csv = e.target?.result as string;
//       const data = parseCSV(csv);
//       if (data.length > 0) {
//         onFileLoaded(data);
//       } else {
//         alert("Invalid CSV format! Ensure it has 'Date', 'Open', 'High', 'Low', 'Close'.");
//       }
//     };
//     reader.readAsText(file);
//   };

//   function parseCSV(csvText: string) {
//     const rows = csvText.split("\n").map(row => row.trim()).filter(row => row);
//     if (rows.length < 2) return [];
  
//     // Extract headers
//     const headers = rows[0].split(",").map(h => h.trim());
//     const dateIndex = headers.indexOf("Date");
//     const openIndex = headers.indexOf("Open");
//     const highIndex = headers.indexOf("High");
//     const lowIndex = headers.indexOf("Low");
//     const closeIndex = headers.indexOf("Close");
  
//     if ([dateIndex, openIndex, highIndex, lowIndex, closeIndex].includes(-1)) {
//       return [];
//     }
  
//     const data = rows.slice(1).map(row => {
//       const cols = row.split(",").map(c => c.trim());
//       if (cols.length < 5) return null;
  
//       return {
//         time: cols[dateIndex].split(" ")[0], // Extracts only `yyyy-mm-dd`
//         open: parseFloat(cols[openIndex]),
//         high: parseFloat(cols[highIndex]),
//         low: parseFloat(cols[lowIndex]),
//         close: parseFloat(cols[closeIndex]),
//       };
//     }).filter(Boolean); // Remove null entries
  
//     return data;
//   }
  

//   return (
//     <div className="d-flex vh-100 align-items-center justify-content-center">
//       <input type="file" accept=".csv" onChange={handleFileUpload} className="border p-2" />
//     </div>
//   );
// };

// export default FileUpload;

//================================================


import React from "react";

interface FileUploadProps {
  onFileLoaded: (data: any[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const data = parseCSV(csv);
      if (data.length > 0) {
        onFileLoaded(data);
      } else {
        alert("Invalid CSV format! Ensure it has 'Date', 'Open', 'High', 'Low', 'Close', 'Volume'.");
      }
    };
    reader.readAsText(file);
  };

  function parseCSV(csvText: string) {
    const rows = csvText.split("\n").map(row => row.trim()).filter(row => row);
    if (rows.length < 2) return [];
  
    // Extract headers
    const headers = rows[0].split(",").map(h => h.trim());
    const dateIndex = headers.indexOf("Date");
    const openIndex = headers.indexOf("Open");
    const highIndex = headers.indexOf("High");
    const lowIndex = headers.indexOf("Low");
    const closeIndex = headers.indexOf("Close");
    const volumeIndex = headers.indexOf("Volume");
  
    if ([dateIndex, openIndex, highIndex, lowIndex, closeIndex, volumeIndex].includes(-1)) {
      return [];
    }
  
    const data = rows.slice(1).map(row => {
      const cols = row.split(",").map(c => c.trim());
      if (cols.length < 6) return null;
  
      return {
        time: cols[dateIndex].split(" ")[0], // Extracts only `yyyy-mm-dd`
        open: parseFloat(cols[openIndex]),
        high: parseFloat(cols[highIndex]),
        low: parseFloat(cols[lowIndex]),
        close: parseFloat(cols[closeIndex]),
        volume: parseFloat(cols[volumeIndex]),
      };
    }).filter(Boolean);
  
    return data;
  }

  return (
    <div className="container text-center w-50 mb-2" >
      <input type="file" accept=".csv" onChange={handleFileUpload} className="form-control" />
    </div>
  );
};

export default FileUpload;