import React, { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  id: number;
  rarity: string;
  hp: number;
}
interface CardData {
  id: number;
  image: string;
  name: string;
}

const App = () => {
  const [data, setData] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<Pokemon | null>(null);
  const [isBoxTextOpen, setIsBoxTextOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.tcgdex.net/v2/en/cards/");
        if (response.ok) {
          const pokemon: CardData[] = await response.json();
          setData(pokemon.slice(4, 9));
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

  return (
    <div>
      <h1>Card list:</h1>

      <p>Print some pokemon cards here ;)</p>

      <div>
        <div>
          {data.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                handleCard(card.id);
                togglefilterOpen();
              }}
            >
              <img src={`${card.image}/low.png`} alt={card.name} />
              {/* //  Tutaj wystarczyłoby sprawdać czy w state: selectedCard, znajduje się jakiś obiekt */}
              {selectedCard && id === card.id && (
                <div data-isBoxTextOpen={isBoxTextOpen}>
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

export default App;
