import { pluralizeMovies } from "../../../lib/pluralize";
import styles from "./FilterBar.module.scss";

type FilterBarProps = {
  summary: readonly string[]; // что выбрано (см. describeFilters)
  foundCount: number;
};

// Строка на всю ширину: что выбрано и сколько найдено.
// aria-live: скринридер озвучивает изменения без перехода по странице.
export function FilterBar({ summary, foundCount }: FilterBarProps) {
  const hasSelection = summary.length > 0;

  return (
    <div className={styles.bar}>
      <span className={styles.title}>Фильтры</span>
      <span
        className={hasSelection ? styles.summary : `${styles.summary} ${styles.empty}`}
        aria-live="polite"
      >
        {hasSelection ? (
          <>
            <strong className={styles.label}>Выбрано:</strong> {summary.join(", ")}
          </>
        ) : (
          "Выбрано: ничего"
        )}
      </span>
      <span className={styles.count} aria-live="polite">
        Найдено: {foundCount} {pluralizeMovies(foundCount)}
      </span>
    </div>
  );
}
