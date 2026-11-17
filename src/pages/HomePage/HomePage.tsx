import { useRef, useState } from "react";
import moviesData from "../../data/movies.json";
import { FilterBar } from "../../components/filters/FilterBar/FilterBar";
import { FilterSidebar } from "../../components/filters/FilterSidebar/FilterSidebar";
import { MovieGrid } from "../../components/movies/MovieGrid/MovieGrid";
import { MovieModal } from "../../components/movies/MovieModal/MovieModal";
import { ShowMoreButton } from "../../components/movies/ShowMoreButton/ShowMoreButton";
import { useCatalog } from "../../context/CatalogContext";
import { roundUpToFullRows, useGridColumns } from "../../hooks/useGridColumns";
import { filterMovies } from "../../lib/filterMovies";
import type { Movie } from "../../types/movie";
import styles from "./HomePage.module.scss";

// Присваивание проверяет компилятор: если форма JSON разойдётся с типом Movie, будет ошибка.
const movies: Movie[] = moviesData.movies;

export function HomePage() {
  const { state, dispatch, summary } = useCatalog();
  const { gridRef, columns } = useGridColumns();
  const [selected, setSelected] = useState<Movie | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  const results = filterMovies(movies, state.filters);
  // Показываем целые ряды, чтобы в последнем ряду не оставалось пустых мест.
  const visible = results.slice(0, roundUpToFullRows(state.requested, columns));

  // Фильтры применяются сразу; «Найти» возвращает взгляд к результатам.
  function showResults() {
    dispatch({ type: "showFirstPage" });
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className={styles.page}>
      <FilterBar summary={summary} foundCount={results.length} />
      <div className={styles.layout}>
        <FilterSidebar filters={state.filters} dispatch={dispatch} onFind={showResults} />
        <section ref={resultsRef} className={styles.results} aria-label="Найденные фильмы">
          <MovieGrid ref={gridRef} movies={visible} onSelect={setSelected} />
          {results.length === 0 ? (
            <p className={styles.empty}>Ничего не найдено. Измените название или фильтры.</p>
          ) : (
            <ShowMoreButton
              shown={visible.length}
              total={results.length}
              onClick={() => dispatch({ type: "showMore" })}
            />
          )}
        </section>
      </div>
      {selected !== null && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
