import React, { useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState(
    "I grew up in a house with Monica, okay. If you didn't eat fast, you didn't eat."
  );
  const [character, setCharacter] = useState("Ross");

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
    console.log(result);
  }

  //const friends = [];

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img
            className="friends-logo"
            src="/img/friends-logo.png"
            alt="friends-logo"
          />
        </div>

        <div>Aqui va: {quote}</div>
        <div>by: {character}</div>
        <button onClick={handleClick}>Random Quote</button>
      </header>
    </div>
  );
}

export default App;
