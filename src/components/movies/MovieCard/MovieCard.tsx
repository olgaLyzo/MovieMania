import { genreLabel } from "../../../data/filterOptions";
import type { Movie } from "../../../types/movie";
import { MoviePoster } from "../MoviePoster/MoviePoster";
import { StarRating } from "../StarRating/StarRating";
import styles from "./MovieCard.module.scss";

type MovieCardProps = {
  movie: Movie;
  onSelect: (movie: Movie) => void;
};

// Карточка фильма: постер, название, жанры и рейтинг.
// Кликабельна вся карточка, но «настоящая» кнопка одна: название.
// Её невидимый слой растянут на всю карточку (так работает и мышь, и клавиатура, и скринридер).
export function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <article className={styles.card}>
      <MoviePoster movie={movie}>
        <span className={styles.year}>{movie.year}</span>
      </MoviePoster>
      <div className={styles.body}>
        <h3 className={styles.title}>
          <button
            type="button"
            className={styles.open}
            aria-haspopup="dialog"
            onClick={() => onSelect(movie)}
          >
            <span className={styles.titleText}>{movie.title.ru}</span>
          </button>
        </h3>
        <p className={styles.genres}>{movie.genres.map(genreLabel).join(", ")}</p>
        <StarRating value={movie.ratings} />
      </div>
    </article>
  );
}
