import React, { useState } from "react";
import "./App.scss";
import { TwitterShareButton } from "react-share";

const THEMES = ["red", "blue", "yellow"];

function App() {
  const [quote, setQuote] = useState(
    "I grew up in a house with Monica, okay. If you didn't eat fast, you didn't eat."
  );
  const [character, setCharacter] = useState("Ross");
  const [theme, setTheme] = useState("yellow");

  async function apiQuotes() {
    const url = "https://friends-quotes-api.herokuapp.com/quotes/random";
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  async function handleClick() {
    const result = await apiQuotes();
    setQuote(result.quote);
    setCharacter(result.character);
    const nextThemeIndex = (THEMES.indexOf(theme) + 1) % THEMES.length;
    setTheme(THEMES[nextThemeIndex]);
  }

  return (
    <div className={`App ${theme}`}>
      <div className="container-logo">
        <img
          className="friends-logo"
          src="/img/friends-logo.png"
          alt="friends"
        />
      </div>
      <div className="container">
        <div className="photoCharacter">
          <img className="friends" src={`/img/${character}.png`} alt="monica" />
        </div>
        <div className="container-bubble">
          <div className="speech-bubble">
            <div className="quote">{`“${quote}”`}</div>
            <div className="character">{`-${character}`}</div>
            <div className="buttons">
              <button onClick={handleClick}>Random Quote</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
