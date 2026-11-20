import { ASSOCIATION_OPTIONS, GENRE_OPTIONS } from "../../../data/filterOptions";
import type { FilterOption } from "../../../data/filterOptions";
import type { FilterDispatch } from "../../../lib/catalogState";
import type { FilterState } from "../../../types/movie";
import { Button } from "../../ui/Button/Button";
import { Chip } from "../../ui/Chip/Chip";
import { StarFilter } from "../StarFilter/StarFilter";
import { YearWheel } from "../YearWheel/YearWheel";
import styles from "./FilterSidebar.module.scss";

type ChipGroupProps = {
  options: readonly FilterOption[];
  selected: readonly string[];
  onToggle: (value: string) => void;
};

function ChipGroup({ options, selected, onToggle }: ChipGroupProps) {
  return (
    <div className={styles.chips}>
      {options.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          selected={selected.includes(option.value)}
          onToggle={() => onToggle(option.value)}
        />
      ))}
    </div>
  );
}

type FilterSidebarProps = {
  filters: FilterState;
  dispatch: FilterDispatch;
  onFind: () => void;
};

// Левая панель: поиск по названию и четыре сворачиваемых раздела.
// Сворачивание делает сам браузер через <details>: без лишнего кода и с поддержкой клавиатуры.
export function FilterSidebar({ filters, dispatch, onFind }: FilterSidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Фильтры">
      <div className={styles.search}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 5 5" />
        </svg>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Поиск фильма"
          aria-label="Поиск по названию"
          value={filters.query}
          onChange={(event) => dispatch({ type: "setQuery", query: event.target.value })}
        />
      </div>

      <details className={styles.section} open>
        <summary className={styles.summary}>Жанры</summary>
        <div className={styles.body}>
          <ChipGroup
            options={GENRE_OPTIONS}
            selected={filters.genres}
            onToggle={(genre) => dispatch({ type: "toggleGenre", genre })}
          />
        </div>
      </details>

      <details className={styles.section} open>
        <summary className={styles.summary}>Год выпуска</summary>
        <div className={styles.body}>
          <YearWheel
            value={filters.year}
            onChange={(year) => dispatch({ type: "setYear", year })}
          />
        </div>
      </details>

      <details className={styles.section} open>
        <summary className={styles.summary}>Рейтинг</summary>
        <div className={styles.body}>
          <StarFilter
            value={filters.rating}
            onChange={(rating) => dispatch({ type: "setRating", rating })}
          />
        </div>
      </details>

      <details className={styles.section} open>
        <summary className={styles.summary}>Ассоциации</summary>
        <div className={styles.body}>
          <ChipGroup
            options={ASSOCIATION_OPTIONS}
            selected={filters.associations}
            onToggle={(association) => dispatch({ type: "toggleAssociation", association })}
          />
        </div>
      </details>

      <div className={styles.actions}>
        <Button className={styles.find} onClick={onFind}>
          Найти
        </Button>
        <Button variant="ghost" onClick={() => dispatch({ type: "reset" })}>
          Сбросить
        </Button>
      </div>
    </aside>
  );
}
