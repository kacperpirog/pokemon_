import React, { useState, useEffect } from "react";
import { CardData, Pokemon } from "./types/types";

const Root = () => {
  const [data, setData] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<Pokemon | null>(null);
  const [isBoxTextOpen, setIsBoxTextOpen] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const [playerAttack, setPlayerAttack] = React.useState(0);
  const [playerHp, setPlayerHp] = React.useState(0);
  const [computerAttack, setComputerAttack] = React.useState(0);
  const [computerHp, setComputerHp] = React.useState(0);
  const [randomCards, setRandomCards] = useState([]);

  const getRandomCards = (cards: CardData[], count: number): CardData[] => {
    const randomCards: CardData[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      randomCards.push(cards[randomIndex]);
    }
    return randomCards;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.tcgdex.net/v2/en/cards/");
        if (response.ok) {
          const pokemon: CardData[] = await response.json();
          // setCards(pokemon);
          console.log(pokemon);
          const playerCards = pokemon.filter((card) => card.id === "player");
          const randomCards = playerCards.sample(5);
          console.log(randomCards);
          const computerCards = pokemon.filter(
            (card) => card.id === "computer"
          );
          for (const card of playerCards) {
            setPlayerAttack(playerAttack + card.attacks);
            setPlayerHp(playerHp + card.hp);
          }
          for (const card of computerCards) {
            setComputerAttack(computerAttack + card.attacks);
            setComputerHp(computerHp + card.hp);
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

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.tcgdex.net/v2/en/cards/");
      if (response.ok) {
        const pokemon: CardData[] = await response.json();
        setCards(pokemon);
        setRandomCards(getRandomCards(pokemon, 5));
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
  // fetch("https://api.tcgdex.net/v2/en/cards/ ")
  //   .then((response) => response.json())
  //   .then((json) => {
  //     // Plus za slice zanim wrzucisz obiekty do state, trzymanie tak dużego state byloby obciążające
  //     setData(json.slice(4, 9));
  //   })
  //   .catch((error) => console.error(error));
  // //  Kolejny plus za error handling, szkoda że zabraklo odpowiedniego state w aplikacji

  const handleCardClick = (id: string) => {
    fetch(`https://api.tcgdex.net/v2/en/cards/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setSelectedCard(json);
      })
      .catch((error) => console.error(error));
  };

  const togglefilterOpen = () => {
    // Niepotrzebnie operujesz na dwóch state żeby wyświetlać box
    // Dodatkowo ten toggle wymusza na użytkowniku odkliknięcie zaznaczonego pokemona żeby sprawdzić następnego
    // a naszym zadaniem jest uproszczenie życia użytkownika :)
    setIsBoxTextOpen(!isBoxTextOpen);
  };
  const { name, id, rarity, hp } = cards;
  return (
    <div>
      <h1>Card list:</h1>

      <p>Print some pokemon cards here ;)</p>
      <div>
        <h1>Random Cards</h1>
        <ul>
          {randomCards.map((card) => (
            <li key={card.id}>
              <img src={`${card.image}/low.png`} alt={card.name} />{" "}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                handleCardClick(card.id);
                togglefilterOpen();
              }}
            >
              {/* <img src={`${card.image}/low.png`} alt={card.name} /> */}
              {/* //  Tutaj wystarczyłoby sprawdać czy w state: selectedCard, znajduje się jakiś obiekt */}
              {selectedCard && id === card.id && (
                <div>
                  {/* isBoxTextOpen={isBoxTextOpen} */}
                  <h3>Details:</h3>
                  <p>
                    Name: <b>{name}</b>
                  </p>
                  <p>
                    Rarity:<b> {rarity}</b>
                  </p>
                  <p>
                    HP: <b>{hp}</b>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
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
