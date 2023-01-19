import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../context";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
const Searchbar = () => {
  const { fetchCity } = useGlobalContext();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState({ city: "", country: "" });
  const [isOpen, setIsOpen] = useState(true);
  const handleChange = (e) => {
    if (e.target.name === "city") {
      setSearchValue({ ...searchValue, city: e.target.value });
    }
    if (e.target.name === "country") {
      setSearchValue({ ...searchValue, country: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchCity(searchValue);
    setSearchValue({ city: "", country: "" });
    navigate("/result");
  };
  const homeBtnRef = useRef();
  const formRef = useRef();
  const sidebarRef = useRef();
  const toggleSidebar = () => {
    homeBtnRef.current.classList.toggle("hide");
    formRef.current.classList.toggle("hide");
    if (isOpen) {
      sidebarRef.current.style.width = "66px";
      setIsOpen(false);
    } else {
      sidebarRef.current.style.width = "20vw";
      setIsOpen(true);
    }
  };
  return (
    <div className="sidebar" ref={sidebarRef}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <Link to="/" className="home-btn" ref={homeBtnRef}>
          Home
        </Link>
      </div>
      <form
        className="form"
        onSubmit={handleSubmit}
        ref={formRef}
        autoComplete="off"
      >
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Search..."
          value={searchValue.city}
          onChange={handleChange}
          required
        ></input>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          placeholder="(optional)"
          value={searchValue.country}
          onChange={handleChange}
        ></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Searchbar;
