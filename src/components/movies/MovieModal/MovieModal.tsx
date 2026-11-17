import { useEffect, useId, useRef, useState } from "react";
import { genreLabel } from "../../../data/filterOptions";
import type { Movie } from "../../../types/movie";
import { MoviePoster } from "../MoviePoster/MoviePoster";
import { StarRating } from "../StarRating/StarRating";
import styles from "./MovieModal.module.scss";

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

// Модальное окно на встроенном элементе <dialog>: браузер сам держит фокус внутри окна,
// закрывает по Esc, затемняет и размывает фон (::backdrop) и возвращает фокус на карточку.
export function MovieModal({ movie, onClose }: MovieModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const baseId = useId();
  const [quotesOpen, setQuotesOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    // Проверка нужна: в режиме разработки React вызывает эффект дважды
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const quotes = movie.quotes.items;
  const meta = [movie.year, movie.genres.map(genreLabel).join(", "), movie.title.original];

  return (
    <>
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={`${baseId}-title`}
      onClose={onClose}
      // Клик по затемнённому фону (он считается кликом по самому <dialog>) закрывает окно
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className={styles.content}>
        <button
          type="button"
          className={styles.close}
          aria-label="Закрыть"
          onClick={() => dialogRef.current?.close()}
        >
          &times;
        </button>

        <div className={styles.header}>
          <MoviePoster movie={movie} className={styles.poster} />
          <div>
            <h2 id={`${baseId}-title`} className={styles.title}>
              {movie.title.ru}
            </h2>
            <p className={styles.meta}>{meta.join(" · ")}</p>
            <StarRating value={movie.ratings} size="md" />
          </div>
        </div>

        <div className={styles.text}>
          <p>{movie.description.ru}</p>
          <p className={styles.note}>{movie.editorialNote.ru}</p>
        </div>

        <button
          type="button"
          className={styles.quotesButton}
          aria-expanded={quotesOpen}
          aria-controls={`${baseId}-quotes`}
          onClick={() => setQuotesOpen((open) => !open)}
        >
          Знаменитые цитаты
        </button>

        {quotesOpen && (
          <div id={`${baseId}-quotes`} className={styles.quotes}>
            {quotes.length === 0 ? (
              <p>{movie.quotes.notFoundMessage.ru}</p>
            ) : (
              quotes.map((quote) => (
                <blockquote key={quote.original} className={styles.quote}>
                  <p>«{quote.ru}»</p>
                  <footer>
                    {quote.character}
                    <span lang="en"> · {quote.original}</span>
                  </footer>
                </blockquote>
              ))
            )}
          </div>
        )}

        {movie.filmUrl ? (
          <a
            className={styles.watchButton}
            href={movie.filmUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Смотреть фильм
          </a>
        ) : (
          <button type="button" className={styles.watchButton} disabled>
            Смотреть фильм
          </button>
        )}
      </div>
    </dialog>
    </>
  );
}
