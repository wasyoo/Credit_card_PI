import React, { useState } from 'react';
import './App.css';
import Credit from "./Card/Card";


//normalize: prepare data to be saved
const normalizeCardNumber = cardNumber =>
  cardNumber.replace(/\D/g, "").slice(0, 16);

//format: prepare data to be rendred
const formatCardNumberForInput = cardNumber => {
  if (cardNumber === "") return "";
  return cardNumber.match(/.{1,4}/g).join(" ");
};

const formatCardNumberForCard = cardNumber =>
  formatCardNumberForInput(cardNumber.concat(".".repeat(16)).slice(0, 16));

const normalizeValidThru = validThru => {
  let monthAndYear = validThru
    .replace(/\D/g, "")
    .slice(0, 4)
    .match(/.{1,2}/g);

  if (!monthAndYear) {
    return "";
  }

  if (monthAndYear.length === 1) {
    let monthAsNumber = Number(monthAndYear[0]);
    if (monthAsNumber > 12) {
      return "12";
    }
    if (monthAsNumber === 0 && monthAndYear[0].length === 2) {
      return "0";
    }
  }

  if (monthAndYear.length === 2) {
    let yearAsNumber = Number(monthAndYear[1]);
    console.log('~ yearAsNumber', yearAsNumber);
    const sort_year = String(new Date().getFullYear()).substr(2);
    console.log('~ sort_year', sort_year);
    if (monthAndYear[1].length === 2 && yearAsNumber > Number(sort_year) + 5) {
      return monthAndYear[0] + `/${Number(sort_year) + 5}`;
    }

    if (monthAndYear[1].length === 2 && yearAsNumber <= Number(sort_year)) {
      return monthAndYear[0] + `/${sort_year}`;
    }

  }

  return monthAndYear.join("/");
};

const formatValidThruForCard = validThru =>
  validThru.concat(".".repeat(4)).slice(0, 5);

function App() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [validThru, setValidThru] = useState("");

  const changeName = event => {
    setName(event.target.value
      .trimLeft()
      .replace(/\d/g, "")
      .toUpperCase()
      .slice(0, 20));
  };

  const changeCardNumber = event => {
    setCardNumber(normalizeCardNumber(event.target.value))
  };

  const changeValidThru = event => {
    setValidThru(normalizeValidThru(event.target.value))

  };

  return (
    <div className="App">
      <Credit
        name={name}
        cardNumber={formatCardNumberForCard(cardNumber)}
        validThru={formatValidThruForCard(validThru)}
      />
      <form>
        <div className="cardForm">
          <div className="col-auto">
            <label htmlFor="cardNumber" className="form-label">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              className="form-control"
              value={formatCardNumberForInput(cardNumber)}
              onChange={changeCardNumber}
            />
          </div>
          <div className="col-auto">
            <label htmlFor="validThru" className="form-label">Valid Date</label>
            <input
              type="text"
              name="validThru"
              className="form-control"
              value={validThru}
              onChange={changeValidThru}
            />
          </div>
          <div className="col-auto">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={changeName}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
