import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import DailyWeather from "../components/DailyWeather";
import HourlyWeather from "../components/HourlyWeather";
import Loading from "../components/Loading";
import Error from "../components/Error";

function City() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({});
  const [city, setCity] = useState({ name: "", state: "", country: "" });
  const [location, setLocation] = useState({
    lat: searchParams.get("lat"),
    lon: searchParams.get("lon"),
  });
  useEffect(() => {
    const { lat, lon } = location;
    // get weather from location
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weathercode,temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`;
    axios
      .get(weatherUrl)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.error(err);
      });
    // get city name from location
    const cityNameUrl = `https://api.api-ninjas.com/v1/reversegeocoding?lat=${lat}&lon=${lon}`;
    axios
      .get(cityNameUrl, {
        headers: { "X-Api-Key": process.env.REACT_APP_API_KEY },
      })
      .then((res) => {
        setCity(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  }, [location]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="city-page">
      <h1 className="city-title">
        {city.name ? `${city.name}, ${city.country}` : null}
      </h1>
      <div className="daily-container">
        {data?.daily?.temperature_2m_max.map((item, index) => {
          return <DailyWeather {...data.daily} key={index} index={index} />;
        })}
      </div>
      <div className="hourly-container">
        {data?.hourly?.time.map((item, index) => {
          if (index % 3 === 0) {
            return <HourlyWeather {...data.hourly} index={index} key={index} />;
          }
        })}
      </div>
    </div>
  );
}

export default City;
