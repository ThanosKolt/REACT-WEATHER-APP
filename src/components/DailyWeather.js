import React from "react";
import getDayName from "../utils/getDayName";
import { CODE_MAP } from "../utils/weathercodeMaping";
const DailyWeather = ({
  index,
  temperature_2m_max,
  temperature_2m_min,
  time,
  weathercode,
}) => {
  const tempMax = Math.ceil(temperature_2m_max[index]);
  const tempMin = Math.ceil(temperature_2m_min[index]);
  const weatherStatus = CODE_MAP.get(weathercode[index]);
  return (
    <div className="single-day">
      <img className="daily-icon" src={`/icons/${weatherStatus}.svg`}></img>
      <p className="day-name">{getDayName(new Date(time[index]))}</p>
      <p className="daily-temp">{`${tempMax}℃  ${tempMin}℃`}</p>
    </div>
  );
};

export default DailyWeather;
