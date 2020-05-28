import React, { useState } from "react";
import TwitterLink from "./TwitterLink";
import "./App.scss";

//this colors are css clases that would be change the color of the page
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
    //this a trick where you are taking the next item of the array
    const nextThemeIndex = (THEMES.indexOf(theme) + 1) % THEMES.length;
    setTheme(THEMES[nextThemeIndex]);
  }

  return (
    <div id="quote-box" className={`App ${theme}`}>
      <div className="container-logo">
        <img
          className="friends-logo"
          src="/img/friends-logo.png"
          alt="friends"
        />
      </div>
      <div className="container-photo-and-bubble">
        <div className="photo-character">
          <img
            className="photo-friend"
            src={`/img/${character}.png`}
            alt="friend"
          />
        </div>
        <div className="container-bubble">
          <div className="speech-bubble">
            <div id="text" className="quote">{`“${quote}”`}</div>
            <div id="author" className="character">{`-${character}`}</div>
            <div className="buttons">
              <div>
                <TwitterLink quote={quote} character={character} />
              </div>
              <button id="new-quote" onClick={handleClick}>
                Random Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
