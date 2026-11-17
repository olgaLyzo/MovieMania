import styles from "./StarFilter.module.scss";

const STARS = [1, 2, 3, 4, 5] as const;

type StarFilterProps = {
  value: number | null;
  onChange: (rating: number | null) => void;
};

// Выбор рейтинга звёздами. Повторное нажатие на выбранную звезду снимает фильтр.
export function StarFilter({ value, onChange }: StarFilterProps) {
  return (
    <div>
      <div className={styles.stars} role="group" aria-label="Рейтинг">
        {STARS.map((star) => (
          <button
            key={star}
            type="button"
            className={
              value !== null && star <= value ? `${styles.star} ${styles.filled}` : styles.star
            }
            aria-pressed={value === star}
            aria-label={`Рейтинг ${star} из 5`}
            onClick={() => onChange(value === star ? null : star)}
          >
            &#9733;
          </button>
        ))}
      </div>
      <p className={value === null ? styles.hint : `${styles.hint} ${styles.active}`}>
        {value === null ? "любой рейтинг" : `только ${value} из 5`}
      </p>
    </div>
  );
}
