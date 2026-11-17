import styles from "./StarRating.module.scss";

const STARS = [1, 2, 3, 4, 5] as const;

type StarRatingProps = {
  value: number; // 1–5
  size?: "sm" | "md";
};

// Показ рейтинга звёздами (только для чтения).
// Скринридер читает одну фразу «Рейтинг N из 5», а не пять отдельных звёзд.
export function StarRating({ value, size = "sm" }: StarRatingProps) {
  return (
    <span
      className={`${styles.rating} ${styles[size]}`}
      role="img"
      aria-label={`Рейтинг ${value} из 5`}
    >
      {STARS.map((star) => (
        <span key={star} className={star <= value ? styles.filled : undefined} aria-hidden="true">
          &#9733;
        </span>
      ))}
    </span>
  );
}
