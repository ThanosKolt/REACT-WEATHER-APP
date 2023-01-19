import axios from "axios";

const fetchWeather = async (lat, long) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
  try {
    const resp = await axios(url);
    return resp;
  } catch (error) {
    console.log(error.response);
  }
};
export default fetchWeather;
