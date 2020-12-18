import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: true,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: (tooltipItem, data) => {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: (value, index, values) => {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, type) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[type][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[type][date];
  }
  return chartData;
};

const LineGraph = (props) => {
  const [data, setData] = useState({});

  const { type } = props;

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=300")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, type);
          setData(chartData);
        });
    };

    fetchData();
  }, [type]);

  return (
    <div>
      {data && data.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor:
                  type === "cases"
                    ? "rgba(204, 16, 52, 0.5)"
                    : type === "recovered"
                    ? "rgba(125, 215, 29, 0.5)"
                    : "rgba(251, 68, 67, 0.5)",
                borderColor:
                  type === "cases"
                    ? "#CC1034"
                    : type === "recovered"
                    ? "#7dd71d"
                    : "#fb4443",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;
