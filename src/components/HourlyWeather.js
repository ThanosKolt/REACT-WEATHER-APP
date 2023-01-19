import React from "react";
import getDayName from "../utils/getDayName";
import { CODE_MAP } from "../utils/weathercodeMaping";
const HourlyWeather = ({ temperature_2m, time, index, weathercode }) => {
  let [date, hour] = time[index].split("T");
  date = getDayName(new Date(date));
  let weatherStatus = weathercode[index];
  let temperature = Math.ceil(temperature_2m[index]);
  let currTime = new Date().getHours();
  let currDate = new Date().getDate();
  let compareDate = Number(time[index].split("T")[0].split("-")[2]);
  let compareTime = Number(time[index].split("T")[1].split(":")[0]);

  return (
    <>
      {index % 8 === 0 ? <h4>{date}</h4> : null}
      {currTime > compareTime && currDate === compareDate ? null : (
        <div className="single-hour-container">
          <p>{hour}</p>
          <p>{temperature} &#8451;</p>
          <img
            className="hourly-icon"
            src={`icons/${CODE_MAP.get(weatherStatus)}.svg`}
          ></img>
        </div>
      )}
    </>
  );
};
export default HourlyWeather;
