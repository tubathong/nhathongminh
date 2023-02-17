import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import Widget from "./../../components/widget/Widget";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
const List = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [newWeatherData, seNewtWeatherData] = useState([]);

  useEffect(() => {
    setInterval(() => {
      const fetchData = async () => {
        await axios
          .get(
            "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata/dht.json"
          )
          .then(async (result) => {
            await setWeatherData(result.data);
          })
          .catch((err) => {});
      };

      const fetchNewData = async () => {
        await axios
          .get(
            "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata.json"
          )
          .then(async (result) => {
            seNewtWeatherData(result.data);
          })
          .catch((err) => {});
      };

      fetchData();
      fetchNewData();

      clearInterval(setInterval);
    }, 1000);
  }, []);
  return (
    <div className="list">
      <Sidebar />
      <ToastContainer />
      <div className="listContainer">
        <Navbar />
        <div className="widgets">
          <Widget data={weatherData} newdata={newWeatherData} type="nhietdo" />
          <Widget data={weatherData} newdata={newWeatherData} type="doam" />
          <Widget data={weatherData} newdata={newWeatherData} type="canhbao" />
          <Widget
            data={weatherData}
            newdata={newWeatherData}
            type="dieukhien"
          />
        </div>
        <div className="listContainerTable">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default List;
