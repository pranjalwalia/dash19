import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

//! we gonna fetch the data for this component independently

function LineGraph() {
  const [data, setData] = useState({});

  const buildChartData = (data, type = "cases") => {
    let chartData = [];
    let lastDataPoint;

    data[type].forEach((date) => {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[type][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[type][date];
    });

    return chartData;
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((res) => res.json())
      .then((data) => {
        const chartData = buildChartData(data);
        setData(chartData);
      });
  }, []);

  return (
    <div>
      <Line
        data={{
          datasets: [
            {
              data: data,
              backgroundColor: "rgba(204 , 16 , 52, 0.2)",
              borderColor: "#CC1034",
            },
          ],
        }}
      />
    </div>
  );
}

export default LineGraph;
