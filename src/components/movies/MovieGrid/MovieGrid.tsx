import type { Ref } from "react";
import type { Movie } from "../../../types/movie";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MovieGrid.module.scss";

type MovieGridProps = {
  movies: readonly Movie[];
  onSelect: (movie: Movie) => void;
  ref?: Ref<HTMLDivElement>; // нужен, чтобы посчитать число колонок (useGridColumns)
};

// Сетка карточек. Колонок столько, сколько помещается (обычно 5–6 на компьютере).
export function MovieGrid({ movies, onSelect, ref }: MovieGridProps) {
  return (
    <div ref={ref} className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
      ))}
    </div>
  );
}
