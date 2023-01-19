import React, { useContext, useReducer } from "react";
import reducer from "./recuder";
import axios from "axios";

const AppContext = React.createContext();
const initialState = {
  city: { name: "", country: "", state: "" },
  loading: false,
  searchResult: [],
  error: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCity = async (input) => {
    dispatch({ type: "LOADING" });
    try {
      const { city, country } = input;
      const url = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`;
      const resp = await axios(url, {
        headers: {
          Accept: "application/json",
          "X-Api-Key": process.env.REACT_APP_API_KEY,
        },
      });
      dispatch({ type: "FETCH_CITY", payload: resp.data });
    } catch (error) {
      dispatch({ type: "ERROR" });
      console.log(error.response);
    }
  };

  const selectCity = (name, state, country) => {
    dispatch({ type: "SELECT_CITY", payload: { name, state, country } });
  };

  return (
    <AppContext.Provider value={{ ...state, fetchCity, selectCity }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
