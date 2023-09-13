import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Character = ({ item: item, index: index }) => {
  const [character, setCharacetr] = useState();
  const [loading, setLoading] = useState(true);
  const _item = item;
  const _jersey = _item
    .replace("https://swapi.dev/api/people/", "")
    .replace("/", "");

  useEffect(() => {
    fetch(item)
      .then((response) => response.json())
      .then((data) => setCharacetr(data))
      .catch()
      .finally(() => setLoading(false));
  }, [character]);

  return (
    <>
      {loading ? (
        <div className={styles.character}>Loading....</div>
      ) : (
        <div className={styles.character}>
          <div className={styles.image}>
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${_jersey}.jpg`}
              alt="image"
            />
          </div>
          <div className={styles.name}>{character?.name}</div>
          <div className={styles.year}>{character?.birth_year}</div>
        </div>
      )}
    </>
  );
};

export default Character;
