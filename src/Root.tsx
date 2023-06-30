import React, { useState, useEffect } from "react";
import { CardData, Pokemon } from "./types/types";

const Root = () => {
  const [data, setData] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<Pokemon | null>(null);
  const [isBoxTextOpen, setIsBoxTextOpen] = useState(false);
  const [cards, setCards] = React.useState([]);
  const [playerAttack, setPlayerAttack] = React.useState(0);
  const [playerHp, setPlayerHp] = React.useState(0);
  const [computerAttack, setComputerAttack] = React.useState(0);
  const [computerHp, setComputerHp] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.tcgdex.net/v2/en/cards/");
        if (response.ok) {
          const pokemon: CardData[] = await response.json();
          setCards(pokemon);
          for (let i = 0; i < 5; i++) {
            const card = cards[i];
            if (card.type === "player") {
              setPlayerAttack(playerAttack + card.attack);
              setPlayerHp(playerHp + card.hp);
            } else {
              setComputerAttack(computerAttack + card.attack);
              setComputerHp(computerHp + card.hp);
            }
          }
        } else {
          console.log("Error", response.status);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  const handleCard = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`https://api.tcgdex.net/v2/en/cards/${id}`);
      if (response.ok) {
        const idCard: Pokemon = await response.json();

        // const { name, id, rarity, hp } = idCard;
        setSelectedCard(idCard);
      } else {
        console.log("Error", response.status);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const togglefilterOpen = () => {
    // Niepotrzebnie operujesz na dwóch state żeby wyświetlać box
    // Dodatkowo ten toggle wymusza na użytkowniku odkliknięcie zaznaczonego pokemona żeby sprawdzić następnego
    // a naszym zadaniem jest uproszczenie życia użytkownika :)
    setIsBoxTextOpen(!isBoxTextOpen);
  };

  const { name, id, rarity, hp } = selectedCard || {};
  const winner = () => {
    if (playerAttack > computerAttack) {
      return "player";
    } else if (playerAttack < computerAttack) {
      return "computer";
    } else {
      if (playerHp > computerHp) {
        return "player";
      } else {
        return "computer";
      }
    }
  };

  return (
    <div>
      <div>
        <div className="game">
          <h1>Card Game</h1>
          <p>Your attack: {playerAttack}</p>
          <p>Your hp: {playerHp}</p>
          <p>Computer attack: {computerAttack}</p>
          <p>Computer hp: {computerHp}</p>
          <p>Winner: {winner()}</p>
        </div>
      </div>
    </div>
  );
};

export default Root;
