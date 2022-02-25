import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [inputValue, setInputValue] = useState("miami");
  const [temp, setTemp] = useState({});
  const [place, setPlace] = useState({});
  const [tempButton, setTempButton] = useState("C");

  const fetchApi = async () => {
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${inputValue}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key":
            "c80e65cd84mshabd5ed73b07b1ecp1154bajsnb1fc9e2534e9",
        },
      }
    );
    const data = await response.json();
    setPlace({
      country: data.location.country,
      city: data.location.name,
      region: data.location.region,
    });

    setTemp({
      celsius: data.current.temp_c,
      icon: data.current.condition.icon,
      weather: data.current.condition.text,
      fahrenheit: data.current.temp_f,
    });
  };

  useEffect(() => {
    fetchApi();
  }, [inputValue]);

  return (
    <div className="Main-container">
      <main className="wrapper">
        <div className="nav-bar">
          <input
            type="text"
            className="search-box"
            placeholder="search"
            value={inputText}
            onChange={(e) => {
              e.preventDefault();
              setInputText(e.target.value);
            }}
          ></input>
          <input
            id="submit"
            onClick={() => setInputValue(inputText)}
            type="submit"
          />
        </div>
        <div className="container">
          <div className="place">
            <h1>Country: {place.country}</h1>
            <h2>City: {place.city}</h2>
            <span>region: {place.region}</span>
          </div>
        </div>
        <div className="weather">
          <div className="temp">
            <img src={temp.icon} alt="Icon" />
            <div className="temp-data">
              <h1> {temp.weather}</h1>
              {tempButton === "C" ? (
                <h1>
                  {temp.celsius} {tempButton}
                </h1>
              ) : (
                <h1>
                  {temp.fahrenheit} {tempButton}
                </h1>
              )}
              <button className="btns" onClick={() => setTempButton("C")}>
                C
              </button>
              <button onClick={() => setTempButton("F")} className="btns">
                F
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
