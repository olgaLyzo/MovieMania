import type { FilterState, Movie } from "../types/movie";
import { normalizeText } from "./normalizeText";

// Отбирает фильмы по выбору пользователя. Все условия работают вместе (И),
// а внутри жанров и ассоциаций достаточно совпадения с любым из выбранных (ИЛИ).
export function filterMovies(movies: readonly Movie[], filters: FilterState): Movie[] {
  const query = normalizeText(filters.query);

  return movies.filter((movie) => {
    const matchesQuery =
      query === "" ||
      normalizeText(`${movie.title.ru} ${movie.title.original}`).includes(query);

    const matchesGenres =
      filters.genres.length === 0 ||
      filters.genres.some((genre) => movie.genres.includes(genre));

    const matchesYear = filters.year === null || movie.year === filters.year;

    const matchesRating = filters.rating === null || movie.ratings === filters.rating;

    const matchesAssociations =
      filters.associations.length === 0 ||
      filters.associations.some((association) => movie.moods.includes(association));

    return (
      matchesQuery && matchesGenres && matchesYear && matchesRating && matchesAssociations
    );
  });
}
