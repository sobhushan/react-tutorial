// src/components/Chart.tsx
import React, { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
} from "lightweight-charts";

interface ChartProps {
  data: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
  selectedCharts: string[];
}

const Chart: React.FC<ChartProps> = ({ data, selectedCharts }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;

    // Destroy previous chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.remove();
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#FFFFFF" },
        textColor: "#000",
      },
      rightPriceScale: {
        visible: true,
      },
      leftPriceScale: {
        visible: false, // Hide left price scale for clarity
      },
    });

    chart.timeScale().applyOptions({
      rightOffset: 5,
    });

    if (selectedCharts.includes("Candlestick")) {
      const candlestickSeries = chart.addCandlestickSeries({
        priceScaleId: "right", // Assign to right price scale
      });

      candlestickSeries.setData(
        data.map((item) => ({
          time: item.time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }))
      );
    }

    if (selectedCharts.includes("Line")) {
      const lineSeries = chart.addLineSeries({
        priceScaleId: "right", // Assign to right price scale
        lineWidth: 1,
      });

      lineSeries.setData(
        data.map((item) => ({
          time: item.time,
          value: item.close,
        }))
      );
    }

    if (selectedCharts.includes("Histogram")) {
      const volumeSeries = chart.addHistogramSeries({
        priceScaleId: "volume", // Assign to separate scale
        color: "rgba(38, 166, 154, 0.3)",
        priceFormat: {
          type: "volume",
        },
      });

      volumeSeries.setData(
        data.map((item) => ({
          time: item.time,
          value: item.volume,
          color: item.volume > 100000000 ? "rgba(242, 35, 35, 0.63)" : "rgba(38, 166, 154, 0.3)",
        }))
      );

      // Apply scale margins to push histogram down
      chart.priceScale("volume").applyOptions({
        scaleMargins: {
          top: 0.75, // Space for the candlestick/line chart
          bottom: 0, // Pushes volume to the bottom
        },
      });
    }

    chartInstance.current = chart;
  }, [data, selectedCharts]);

  return <div ref={chartContainerRef} style={{ width: "100%", height: "600px" }} />;
};

export default Chart;





//===========================================


// import React, { useEffect, useRef } from "react";
// import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";

// interface ChartProps {
//   data: {
//     time: string;
//     open: number;
//     high: number;
//     low: number;
//     close: number;
//     volume: number;
//   }[];
// }

// const Chart: React.FC<ChartProps> = ({ data }) => {
//   const chartContainerRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<IChartApi | null>(null);
//   const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
//   const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
//   const histogramSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     chartRef.current = createChart(chartContainerRef.current, {
//       width: chartContainerRef.current.clientWidth,
//       height: 500,
//       layout: { background: { color: "white" }, textColor: "black" },
//       grid: { vertLines: { color: "#e1e1e1" }, horzLines: { color: "#e1e1e1" } },
//     });

//     // Candlestick Chart (Main Price Data)
//     candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
//       upColor: "#26a69a",
//       downColor: "#ef5350",
//       borderVisible: false,
//       wickUpColor: "#26a69a",
//       wickDownColor: "#ef5350",
//       priceScaleId: "right", // Main price scale
//     });

//     // Line Chart (Closing Prices)
//     lineSeriesRef.current = chartRef.current.addLineSeries({
//       color: "#007bff",
//       lineWidth: 2,
//       priceScaleId: "right", // Same as candlestick
//     });

//     // Histogram Chart (Volume)
//     histogramSeriesRef.current = chartRef.current.addHistogramSeries({
//         color: "rgba(38, 166, 154, 0.3)", // Teal with 50% opacity
//         base: 0, // Ensures volume bars start from the bottom
//         priceScaleId: "left", // Separate scale for volume
//         priceFormat: {
//             type: "volume",
//         },
//     });
//     chartRef.current.priceScale("left").applyOptions({
//         scaleMargins: {
//           top: 0.8,
//           bottom: 0,
//         },
//       });

//     return () => {
//       chartRef.current?.remove();
//     };
//   }, []);

//   useEffect(() => {
//     if (candlestickSeriesRef.current && lineSeriesRef.current && histogramSeriesRef.current) {
//       candlestickSeriesRef.current.setData(data);
//       lineSeriesRef.current.setData(data.map(({ time, close }) => ({ time, value: close })));
//       histogramSeriesRef.current.setData(data.map(({ time, volume }) => ({ time, value: volume })));
//     }
//   }, [data]);

//   return <div ref={chartContainerRef} className="w-100 h-100 shadow-lg rounded p-2 bg-white overflow-hidden"  />;
// };

// export default Chart;