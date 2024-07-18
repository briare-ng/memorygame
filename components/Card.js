import Image from "next/image";
import styles from "../styles/Card.module.css";

function Card(props) {

  const handleClick = () => {
    props.selectCard(props);
  };

  return (
    <div className={`${styles.card} ${(props.selected || props.found) && styles.active}`}>
      <div className={styles.flipper}>
        <div className={styles.cardFront} onClick={handleClick}>
          <Image
            src="/images/questionmark.svg"
            alt="Card back"
            width={50}
            height={50}
          />
        </div>
        <div className={`${styles.cardBack} ${props.found && styles.found}`}>
          <Image
            src={`/images/${props.image}`}
            alt={props.name}
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
