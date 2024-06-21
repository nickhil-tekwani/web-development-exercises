import React, { useState, useEffect } from "react";
import shuffle from "lodash.shuffle";
import "./App.css";

// image for the pokemon
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png

const pokemon = [
  { id: "004", name: "charizard" },
  { id: "010", name: "caterpie" },
  { id: "077", name: "ponyta" },
  { id: "108", name: "lickitung" },
  { id: "132", name: "ditto" },
  { id: "133", name: "eevee" },
];
const doublePokemon = shuffle([...pokemon, ...pokemon]);

export default function App() {
  const [opened, setOpened] = useState([]); // only have 2 elements
  const [counter, setCounter] = useState(0);
  const [winners, setWinners] = useState([]);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(async () => {
    // check to see if user has won on this component remount 
    if(winners.length === 6) {
      // wait 0.5 sec before announcing winner to 
      await delay(500);
      alert("You won! It took you " + counter + " moves. Please refresh this page to start a new game.")
    }
    
  });

  async function flipCard(index) {
    // if card that was clicked is already open
    if (opened.includes(index)) return;

    // add to counter
    setCounter(counter + 1)

    const newOpened = [...opened, index]
    setOpened(newOpened);

    if(newOpened.length === 2) {
      const firstPokemon = doublePokemon[newOpened[0]];
      const secondPokemon = doublePokemon[newOpened[1]];
      
      if (firstPokemon.name === secondPokemon.name) {
        // keep them flipped for rest of game
        console.log('they match, keep them flipped and add to winners')
        const newWinners = [...winners, firstPokemon.name]
        setWinners(newWinners)
        setOpened([]);

      } else {
        // flip them back after 0.5 sec delay so user remembers pokemon location
        await delay(500);
        setOpened([]);
        console.log('they didnt match, flipped back after 0.5 sec delay')
      }
    }

  }
  

  return (
    <div className="app">
      <p>
        {counter} <strong>moves</strong>
      </p>

      <div className="cards">
        {doublePokemon.map((pokemon, index) => {
          let isFlipped = false;

          // card should be flipped if it's one of the 2 "opened" cards, or it's already a winner
          if (winners.includes(pokemon.name) || opened.includes(index)) {
            isFlipped = true;
          } 
          
          return (
            <PokemonCard
              key={index}
              index={index}
              pokemon={pokemon}
              isFlipped={isFlipped}
              flipCard={flipCard}
            />
          );
        })}
      </div>
    </div>
  );
}

function PokemonCard({ index, pokemon, isFlipped, flipCard }) {

  return (
    <button
      // ref={useRef('pokemon'+index)}
      className={`pokemon-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => flipCard(index)}
    >
      <div className="inner">
        <div className="front">
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png`}
            alt={pokemon.name}
            width="100"
          />
        </div>
        <div className="back">?</div>
      </div>
    </button>
  );
}
