import axios from "axios";
import React from "react";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  useEffect(() => {
    setInterval(() => {
      const fetchData = async () => {
        await axios
          .get(
            "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata.json"
          )
          .then(async (result) => {
            await setWeatherData(result);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
      fetchData();
      clearInterval(setInterval);
    }, 1000);
  }, []);
  return (
    <AppContext.Provider value={{ weatherData }}>
      {children}
    </AppContext.Provider>
  );
};
