import React, { useState, useEffect } from "react";
import { CardData } from "./types/types";

const Root = () => {
  const [cards, setCards] = useState<CardData[]>([]);
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
      } else {
        console.log("Error", response.status);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // const { name, id, rarity, hp } = cards;
  useEffect(() => {
    fetchData();
  }, []);

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
      <ul>
        {computerCards.map((card) => (
          <li key={card.id}>
            <img src={`${card.image}/low.png`} alt={card.name} />
            {card.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Root;

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch("https://api.tcgdex.net/v2/en/cards/id");
//       if (response.ok) {
//         const pokemon: CardData[] = await response.json();
//         setCards(pokemon);
//         console.log(pokemon);
//         const playerCards = pokemon.filter((card) => card.name === "player");
//         const computerCards = pokemon.filter(
//           (card) => card.name === "computer"
//         );
//         for (const card of playerCards) {
//           setPlayerAttack(playerAttack + card.attacks);
//           setPlayerHp(playerHp + card.hp);
//         }
//         for (const card of computerCards) {
//           setComputerAttack(computerAttack + card.attacks);
//           setComputerHp(computerHp + card.hp);
//         }
//       } else {
//         console.log("Error", response.status);
//       }
//     } catch (error) {
//       console.log("Error", error);
//     }
//   };
//   fetchData();
// }, []);

// const handleCard = async (id: number): Promise<void> => {
//   try {
//     const response = await fetch(`https://api.tcgdex.net/v2/en/cards/${id}`);
//     if (response.ok) {
//       const idCard: Pokemon = await response.json();

//       // const { name, id, rarity, hp } = idCard;
//       setSelectedCard(idCard);
//     } else {
//       console.log("Error", response.status);
//     }
//   } catch (error) {
//     console.log("Error", error);
//   }
// };

// // const togglefilterOpen = () => {
// //   setIsBoxTextOpen(!isBoxTextOpen);
// // };

// // const { name, id, rarity, hp } = selectedCard || {};
// const winner = () => {
//   if (playerAttack > computerAttack) {
//     return "player";
//   } else if (playerAttack < computerAttack) {
//     return "computer";
//   } else {
//     if (playerHp > computerHp) {
//       return "player";
//     } else {
//       return "computere";
//     }
//   }
// };

// return (
//   <div>
//     <div>
//       <div className="game">
//         <h1>Card Game</h1>
//         <p>Your attack: {playerAttack}</p>
//         <p>Your hp: {playerHp}</p>
//         <p>Computer attack: {computerAttack}</p>
//         <p>Computer hp: {computerHp}</p>
//         <p>Winner: {winner()}</p>
//       </div>
//     </div>
//   </div>
// );
// };

// fetch("https://api.tcgdex.net/v2/en/cards/ ")
//   .then((response) => response.json())
//   .then((json) => {
//     // Plus za slice zanim wrzucisz obiekty do state, trzymanie tak dużego state byloby obciążające
//     setData(json.slice(4, 9));
//   })
//   .catch((error) => console.error(error));
// //  Kolejny plus za error handling, szkoda że zabraklo odpowiedniego state w aplikacji

// const handleCardClick = (id: string) => {
//   fetch(`https://api.tcgdex.net/v2/en/cards/${id}`)
//     .then((response) => response.json())
//     .then((json) => {
//       setSelectedCard(json);
//     })
//     .catch((error) => console.error(error));
// };

// const togglefilterOpen = () => {
//   // Niepotrzebnie operujesz na dwóch state żeby wyświetlać box
//   // Dodatkowo ten toggle wymusza na użytkowniku odkliknięcie zaznaczonego pokemona żeby sprawdzić następnego
//   // a naszym zadaniem jest uproszczenie życia użytkownika :)
//   setIsBoxTextOpen(!isBoxTextOpen);
// };
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch("https://api.tcgdex.net/v2/en/cards/");
//       if (response.ok) {
//         const pokemon: CardData[] = await response.json();
//         // setCards(pokemon);
//         console.log(pokemon);
//         const playerCards = pokemon.filter((card) => card.id === "player");

//         console.log(randomCards);
//         const computerCards = pokemon.filter(
//           (card) => card.id === "computer"
//         );
//         for (const card of playerCards) {
//           setPlayerAttack(playerAttack + card.attacks);
//           setPlayerHp(playerHp + card.hp);
//         }
//         for (const card of computerCards) {
//           setComputerAttack(computerAttack + card.attacks);
//           setComputerHp(computerHp + card.hp);
//         }
//       } else {
//         console.log("Error", response.status);
//       }
//     } catch (error) {
//       console.log("Error", error);
//     }
//   };
//   fetchData();
// }, []);
