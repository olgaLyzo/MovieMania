import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { YEAR_RANGE } from "../../../data/filterOptions";
import styles from "./YearWheel.module.scss";

// Высота строки колёсика. Должна совпадать с $item-height в YearWheel.module.scss.
const ITEM_HEIGHT = 32;
const SCROLL_DEBOUNCE_MS = 90;

// Годы от новых к старым. Перед ними пункт «Любой год» (индекс 0).
const YEARS = Array.from(
  { length: YEAR_RANGE.max - YEAR_RANGE.min + 1 },
  (_, i) => YEAR_RANGE.max - i,
);

function indexToYear(index: number): number | null {
  return index === 0 ? null : YEAR_RANGE.max - (index - 1);
}

function yearToIndex(year: number | null): number {
  return year === null ? 0 : YEAR_RANGE.max - year + 1;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

type YearWheelProps = {
  value: number | null;
  onChange: (year: number | null) => void;
};

// Прокручиваемое колёсико выбора года (как выбор года рождения в календаре).
// Выбран тот год, что находится в рамке по центру. Работает и с клавиатуры (↑ ↓).
export function YearWheel({ value, onChange }: YearWheelProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const selectedIndex = yearToIndex(value);

  // Колёсико следует за значением, например после «Сбросить».
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (Math.round(list.scrollTop / ITEM_HEIGHT) !== selectedIndex) {
      list.scrollTo({ top: selectedIndex * ITEM_HEIGHT, behavior: "smooth" });
    }
  }, [selectedIndex]);

  // Не оставляем таймер после удаления компонента.
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // Ждём, пока прокрутка остановится, и только тогда сообщаем выбранный год.
  function handleScroll() {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      const list = listRef.current;
      if (!list) return;
      const index = clamp(Math.round(list.scrollTop / ITEM_HEIGHT), 0, YEARS.length);
      onChange(indexToYear(index));
    }, SCROLL_DEBOUNCE_MS);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    onChange(indexToYear(clamp(selectedIndex + step, 0, YEARS.length)));
  }

  return (
    <div className={value === null ? styles.wheel : `${styles.wheel} ${styles.active}`}>
      <div
        ref={listRef}
        className={styles.list}
        role="listbox"
        tabIndex={0}
        aria-label="Год выпуска"
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.spacer} aria-hidden="true" />
        <div
          role="option"
          aria-selected={selectedIndex === 0}
          className={selectedIndex === 0 ? `${styles.item} ${styles.selected}` : styles.item}
          onClick={() => onChange(null)}
        >
          Любой год
        </div>
        {YEARS.map((year, i) => (
          <div
            key={year}
            role="option"
            aria-selected={selectedIndex === i + 1}
            className={
              selectedIndex === i + 1 ? `${styles.item} ${styles.selected}` : styles.item
            }
            onClick={() => onChange(year)}
          >
            {year}
          </div>
        ))}
        <div className={styles.spacer} aria-hidden="true" />
      </div>
      <span className={styles.fadeTop} aria-hidden="true" />
      <span className={styles.fadeBottom} aria-hidden="true" />
      <span className={styles.band} aria-hidden="true" />
    </div>
  );
}
