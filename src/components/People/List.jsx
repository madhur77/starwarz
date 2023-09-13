import Character from "./Character";
import styles from "./styles.module.css";

const List = ({ residents: residents }) => {
  return (
    <div className={styles.peoples}>
      {residents?.length > 0 ? (
        residents.map((item, index) => {
          return <Character item={item} key={index} index={index}></Character>;
        })
      ) : (
        <div>Data not found</div>
      )}
    </div>
  );
};

export default List;
