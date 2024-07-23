import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  // State-variabeln nedan används för att hämta API:et.
  const [films, setFilms] = useState([]);
  /* State-variablerna nedan används för att hämta detaljer som titel, episod och handling från API:et. 
  Där exempelvis title är det som ska hämtas medan setTitle är en funktion att använda för att hämta den intormationen. */
  const [title, setTitle] = useState('');
  const [episodeId, setEpisodeId] = useState('');
  const [openingCrawl, setOpeningCrawl] = useState('');
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  // State-variabeln nedan används för att koppla ihop input-fältet med loopen i showText.
  const [searchString, setSearchString] = useState('');
  useEffect(() => {
    fetch('https://swapi.dev/api/films/') //Länken till API:et hämtas med fetch.
      .then((response) => response.json())
      .then((data) => setFilms(data.results));
  }, []);

  // Funktionen nedan är kopplad med input-fältet och genom denna funktion blir input-fältet kopplat med loopen i showTitle.
  function changeText(event) {
    setSearchString(event.target.value);
  }

  /* Funktion där API:et loopas igenom och ifall det som skrivs in i input-fältet (searchString) matchar
  med en av filmtitlarna kommer titel samt de andra detaljerna att skrivas in i h2-elementet samt div-elementen under return. */
  function showTitle() {
    for (let i = 0; i < films.length; i++) {
      if (films[i].title == searchString) {
        setTitle(films[i].title);
        setEpisodeId(films[i].episode_id);
        setOpeningCrawl(films[i].opening_crawl);
        setDirector(films[i].director);
        setProducer(films[i].producer);
        setReleaseDate(films[i].release_date);
        break;
      }
    }
  }

  return (
    <div className="wrapper">
      <header>
        <h1>Star Wars databas</h1>
      </header>
      <p className="centralizedText">
        Här i denna databas kan du söka fram information om Star Wars-filmerna
        episod 1-6. <br></br> Det är bara att söka i sökfältet nedan med titeln
        till din favorit Star Wars-film så löser vi resten. <br></br>
        Informationen är hämtad från Star Wars API (SWAPI).
      </p>
      <div className="searchField">
        <label>SWAPI sökmotor</label>
        <input
          type="text"
          placeholder="Sök på titel för att fylla i fälten nedan..."
          value={searchString}
          onChange={changeText}
        />
        {/* Input-fältet är kopplat till funtkionen changeText genom onChange och blir på så sätt kopplad till showText-funktionen med loopen. */}
        <button disabled={films.length === 0} onClick={showTitle}>
          Visa film
        </button>
        {/* Knappen är inaktiverad när API:et inte har laddats in. Den aktiveras när SWAPI är redo. */}
      </div>
      <div className="output">
        <h2 className="centralizedText">{title}</h2>
        <div>
          <span>Episod:</span> {episodeId}
        </div>
        <div>
          <span>Handling:</span> {openingCrawl}
        </div>
        <div>
          <span>Regissör:</span> {director}
        </div>
        <div>
          <span>Producent:</span> {producer}
        </div>
        <div>
          <span>Utgivningsdatum:</span> {releaseDate}
        </div>
      </div>
    </div>
  );
}
