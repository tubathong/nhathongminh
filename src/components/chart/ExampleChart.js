import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ExampleChart = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(
          "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata/dht.json"
        )
        .then(async (result) => {
          await setWeatherData(result.data);
        })
        .catch((err) => { });
    };
    //console.log(weatherData);
    setInterval(() => {
      fetchData();
    }, 1000);
  }, []);

  const data = Array.isArray(weatherData)
    ? weatherData
      .map((item, key) => ({
        key: key,
        name: item.createAt ? item.createAt : " ",
        doam: item.doam,
        nhietdo: item.nhietdo,
      }))
      .slice(-5)
    : [];
  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 10,
        left: 10,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="doam"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="nhietdo" stroke="#82ca9d" />
    </LineChart>
  );
};

export default ExampleChart;
