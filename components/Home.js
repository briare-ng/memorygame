import { useState, useEffect } from "react";
import Card from "./Card";
import styles from "../styles/Home.module.css";

function Home() {
  const initialDeck = [
    { id: 1, name: "billiard ball", image: "/billiardball.svg" },
    { id: 2, name: "billiard ball", image: "/billiardball.svg" },
    { id: 3, name: "bubble tea", image: "/bubbletea.svg" },
    { id: 4, name: "bubble tea", image: "/bubbletea.svg" },
    { id: 5, name: "cactus", image: "/cactus.svg" },
    { id: 6, name: "cactus", image: "/cactus.svg" },
    { id: 7, name: "dog", image: "/dog.svg" },
    { id: 8, name: "dog", image: "/dog.svg" },
    { id: 9, name: "laptop", image: "/laptop.svg" },
    { id: 10, name: "laptop", image: "/laptop.svg" },
    { id: 11, name: "octopus", image: "/octopus.svg" },
    { id: 12, name: "octopus", image: "/octopus.svg" },
    { id: 13, name: "strawberry", image: "/strawberry.svg" },
    { id: 14, name: "strawberry", image: "/strawberry.svg" },
    { id: 15, name: "sunglasses", image: "/sunglasses.svg" },
    { id: 16, name: "sunglasses", image: "/sunglasses.svg" },
  ];

  const [deck, setDeck] = useState(initialDeck); //deck de cartes mélangées
  const [selected, setSelected] = useState([]); //tableau de cartes séléctionées
  const [foundPairs, setFoundPairs] = useState(0); //nb de paires de cartes touvées

  const initGame = () => {
    // Mélanger les cartes du deck
    //reconstruit le tableau initialDeck avec sort() et 1fct de comparaison qui retourne <0 ou 0>
    const newDeck = initialDeck.sort(() => Math.random() - 0.5);
    //ajout d'une propriété selected à chaque obj
    const updateDeck = newDeck.map((obj) => {
      return { ...obj, selected: false, found: false };
    });
    setDeck(updateDeck);
  };

  useEffect(() => {
    initGame();
  }, []);

  const selectCard = (cardProps) => {
    //inverse data flow pour déterminer quelle carte est séléctionnée
    if (selected.length < 2) {
      //bloque la sélection du nombre de cartes à 2
      // console.log(`click on, ${cardProps.name} id : ${cardProps.id}`);
      //Maj de deck avec la nouvelle propriété selected
      const updateDeck = deck.map((card) => {
        if (card.id == cardProps.id) {
          //change la propriété selected du composant à true dans l'état deck
          return { ...card, selected: true };
        } else {
          return card;
        }
      });
      setDeck(updateDeck);
      //ajoute la carte sélectionnée au tableau d'état selected et met à jour deck pour re-render
      setSelected([...selected, cardProps]);
      // console.log(newCardProps);
    }
  };

  const checkSelectedCards = () => {
    //vérifie si une paire est trouvée d'après l'état selected
    if (selected.length == 2) {
      //déterminer si on a un paire et mettre à jour l'affichage
      if (selected[0].name !== selected[1].name) {
        //repasser selected:false sur les 2 obj du deck
        const updateDeck = deck.map((card) => {
          if (card.id == selected[0].id || card.id == selected[1].id) {
            return { ...card, selected: false };
          } else {
            return card;
          }
        });
        setDeck(updateDeck);
      } else {
        const updateDeck = deck.map((card) => {
          if (card.id == selected[0].id || card.id == selected[1].id) {
            return { ...card, selected: false, found: true };
          } else {
            return card;
          }
        });
        setDeck(updateDeck);
        setFoundPairs(foundPairs + 1);
      }
      //réinitialiser selected
      setSelected([]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkSelectedCards();
    }, 600);
  }, [selected]);

  useEffect(() => {
    if (foundPairs === 8) {
      // Toutes les paires ont été trouvées
      console.log("gameOver");
    }
  }, [foundPairs]);
  const resetGame = () => {
    setFoundPairs(0);
    initGame();
  };
  const cardsToDisplay = deck.map((card, index) => {
    return (
      <Card
        key={index}
        id={card.id}
        name={card.name}
        image={card.image}
        selected={card.selected}
        selectCard={selectCard}
        found={card.found}
      />
    );
  });

  // console.log(deck);
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Memory Game 🧠</h1>
        <div className={styles.headerDivider} />
      </div>
      <div className={styles.main}>
        <div className={styles.grid}>{cardsToDisplay}</div>
        {foundPairs === 8 && (
          <div className={styles.victorySection}>
            <p className={styles.victoryText}>You Win!</p>
            <button className={styles.replayBtn} onClick={resetGame}>
              Replay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
//timer
//count
//change cards, set de différentes cartes
//nommer les cartes à l'écran, en différéntes langues (apprentissage des langues)
//sons
//mettre en avant les cartes founds avec un border neon bleu
//gestion du responsive design
