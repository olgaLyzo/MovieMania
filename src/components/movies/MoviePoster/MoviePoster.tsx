import { useState } from "react";
import type { ReactNode } from "react";
import { genreLabel } from "../../../data/filterOptions";
import type { Movie } from "../../../types/movie";
import styles from "./MoviePoster.module.scss";

type Gradient = readonly [from: string, to: string];

// Цвета «заглушки» постера: по первому жанру. Видны, пока нет картинки.
const DEFAULT_GRADIENT: Gradient = ["#7f77dd", "#3c3489"];
const DANCE_GRADIENT: Gradient = ["#d4537e", "#534ab7"];
const GENRE_GRADIENTS: Readonly<Record<string, Gradient>> = {
  drama: DEFAULT_GRADIENT,
  comedy: ["#f0a63a", "#b5651d"],
  "sci-fi": ["#2aa88a", "#0f5e4d"],
  animation: ["#e4749b", "#993556"],
  romance: ["#e5654a", "#8f2a18"],
  horror: ["#7a2f2f", "#2a0d0d"],
  thriller: ["#5b6470", "#1f242b"],
  fantasy: ["#5aa84a", "#2a5a1f"],
  action: ["#d34a3a", "#7a1f16"],
  detective: ["#9b7a52", "#4e3018"],
  adventure: ["#3f9bd6", "#1c4f7a"],
};

function placeholderBackground(movie: Movie, mainGenre: string): string {
  const [from, to] = movie.moods.includes("dance")
    ? DANCE_GRADIENT
    : (GENRE_GRADIENTS[mainGenre] ?? DEFAULT_GRADIENT);
  return `linear-gradient(160deg, ${from}, ${to})`;
}

type MoviePosterProps = {
  movie: Movie;
  className?: string; // размер и скругления задаёт тот, кто использует постер
  children?: ReactNode; // то, что кладётся поверх (например, бейдж с годом)
};

// Постер фильма. Если картинки нет или она не загрузилась, остаётся цветная заглушка.
export function MoviePoster({ movie, className, children }: MoviePosterProps) {
  const [failed, setFailed] = useState(false);
  const [mainGenre = ""] = movie.genres;

  return (
    <div
      className={className ? `${styles.poster} ${className}` : styles.poster}
      style={{ background: placeholderBackground(movie, mainGenre) }}
    >
      <span className={styles.icon} aria-hidden="true">
        &#127916;
      </span>
      <span aria-hidden="true">{genreLabel(mainGenre)}</span>
      {movie.posterUrl !== null && !failed && (
        <img
          className={styles.image}
          src={movie.posterUrl}
          alt={`Постер фильма «${movie.title.ru}»`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      {children}
    </div>
  );
}
