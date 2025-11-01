import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Chart: any;
  }
}

interface ChartRendererProps {
  chartData: string;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current || !window.Chart) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    try {
      const parsedData = JSON.parse(chartData);
      chartInstanceRef.current = new window.Chart(ctx, parsedData);
    } catch (error) {
      console.error("Failed to parse or render chart:", error);
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [chartData]);

  return <canvas ref={canvasRef} className="max-w-full"></canvas>;
};

export default ChartRenderer;
