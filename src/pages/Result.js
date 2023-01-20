import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
const Result = () => {
  const { loading, error, searchResult, selectCity } = useGlobalContext();
  if (loading) return <Loading />;
  if (error) return <Error />;
  if (searchResult.length === 0) {
    return (
      <div className="result-container">
        <h1>No results found</h1>
      </div>
    );
  }
  return (
    <div className="result-container">
      {searchResult
        ? searchResult.map((item, index) => {
            return (
              <Link
                className="city-btn"
                key={index}
                to={`/city?lat=${item.latitude}&lon=${item.longitude}`}
                onClick={() => selectCity(item.name, item.state, item.country)}
              >
                {`${item.name}, ${item.state}, ${item.country}`}
              </Link>
            );
          })
        : null}
    </div>
  );
};

export default Result;
