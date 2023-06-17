import React, { useState, useEffect } from "react";

// Fajnie by było zobaczyć jak podzieliłbyś aplikacje na componenty, była na to przestrzeń a to by dało większy wgląd w Twoje umiejętnośći
// Wrzucenie wszystkiego w jednym pliku jest dość nieczytelne nawet jak na tak małą aplikacje.
interface Pokemon {
  name: string;
  id: number;
  rarity: string;
  hp: number;
}
const App = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [isBoxTextOpen, setIsBoxTextOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.tcgdex.net/v2/en/cards/");
        if (response.ok) {
          const pokemon = await response.json();
          setData(pokemon);
        } else {
          console.log("Error", response.status);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
    // fetch("https://api.tcgdex.net/v2/en/cards/ ")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     // Plus za slice zanim wrzucisz obiekty do state, trzymanie tak dużego state byloby obciążające
    //     setData(json);
    //   })
    //   .catch((error) => console.error(error));
    //  Kolejny plus za error handling, szkoda że zabraklo odpowiedniego state w aplikacji
  }, []);

  const handleCardClick = (id: number) => {
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
  const { name, id, rarity, hp } = selectedCard;
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
                handleCardClick(card.id);
                togglefilterOpen();
              }}
            >
              <img src={`${card.image}/low.png`} alt={card.name} />
              {/* //  Tutaj wystarczyłoby sprawdać czy w state: selectedCard, znajduje się jakiś obiekt */}
              {selectedCard && id === card.id && (
                <div isBoxTextOpen={isBoxTextOpen}>
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
