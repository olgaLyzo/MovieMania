import { Button } from "../../ui/Button/Button";
import styles from "./ShowMoreButton.module.scss";

type ShowMoreButtonProps = {
  shown: number;
  total: number;
  onClick: () => void;
};

// Подпись «Показано X из Y» и кнопка. Когда всё показано, кнопка неактивна.
export function ShowMoreButton({ shown, total, onClick }: ShowMoreButtonProps) {
  const allShown = shown >= total;

  return (
    <div className={styles.footer}>
      <p className={styles.caption} aria-live="polite">
        Показано {shown} из {total}
      </p>
      <Button className={styles.button} disabled={allShown} onClick={onClick}>
        {allShown ? "Это все фильмы" : "Показать больше"}
      </Button>
    </div>
  );
}
