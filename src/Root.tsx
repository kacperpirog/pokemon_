import React, { useState, useEffect } from "react";

export interface Pokemon {
  name: string;
  id: number;
  rarity: string;
  hp: number;
}
export interface CardData {
  id: string;
  image: string;
  name: string;
  attacks: number;
  hp: string;
  rarity: string;
}
const Root = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardData[]>([]);
  const [randomCards, setRandomCards] = useState<CardData[]>([]);
  const [computerCards, setComputerCards] = useState<CardData[]>([]);

  const getRandomCards = (cards: CardData[], count: number): CardData[] => {
    const randomCards: CardData[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      randomCards.push(cards[randomIndex]);
    }
    return randomCards;
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.tcgdex.net/v2/en/cards/");
      if (response.ok) {
        const pokemon: CardData[] = await response.json();
        setCards(pokemon);
        setRandomCards(getRandomCards(pokemon, 5));
        setComputerCards(getRandomCards(pokemon, 5));
        console.log(pokemon, 5);
      } else {
        console.log("Error", response.status);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleCard = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`https://api.tcgdex.net/v2/en/cards/${id}`);
      if (response.ok) {
        const idCard: Pokemon[] = await response.json();

        // const { name, id, rarity, hp } = idCard;
        setSelectedCard(idCard);
      } else {
        console.log("Error", response.status);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chooseCard = async (cards: CardData[]) => {
    // Wyświetlamy listę kart do wyboru
    console.log("Wybierz kartę do ataku:");
    for (const card of cards) {
      console.log(`* ${card.name}`);
    }

    // Pobieramy numer wybranej karty
    const playerCard = await prompt("Podaj numer karty: ");

    // Sprawdzamy, czy numer jest prawidłowy
    if (playerCard < 1 || playerCard > cards.length) {
      console.log("Nieprawidłowy numer karty!");
      return chooseCard(cards);
    }

    // Zwracamy wybraną kartę
    return cards[playerCard - 1];
  };

  return (
    <div>
      <h1>Card Game</h1>
      <ul>
        {randomCards.map((card) => (
          <li key={card.id}>
            <img src={`${card.image}/low.png`} alt={card.name} />
            {card.name}
          </li>
        ))}
      </ul>
      <h1>Computer card</h1>
      <ul>
        {computerCards.map((card) => (
          <li key={card.id}>
            <img src={`${card.image}/low.png`} alt={card.name} />
            {card.name}
          </li>
        ))}
      </ul>
      <button
        onClick={async () => {
          const playerCard = await chooseCard(randomCards);
          const computerCard = await chooseCard(computerCards);
          console.log(playerCard, computerCard);
        }}
      >
        Play
      </button>
    </div>
  );
};
export default Root;
