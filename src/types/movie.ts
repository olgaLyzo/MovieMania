// Типы данных повторяют структуру src/data/movies.json (schemaVersion 1).

export type LocalizedText = {
  ru: string;
  en: string;
};

export type MovieTitle = {
  original: string;
  ru: string;
};

export type Quote = {
  original: string;
  ru: string;
  character: string;
};

export type Movie = {
  id: string;
  title: MovieTitle;
  year: number;
  genres: string[]; // коды жанров, см. data/filterOptions.ts
  moods: string[]; // коды ассоциаций (например, "dance")
  description: LocalizedText;
  editorialNote: LocalizedText;
  quotes: {
    items: Quote[];
    notFoundMessage: LocalizedText;
  };
  runtimeMinutes: string;
  director: string;
  posterUrl: string | null;
  filmUrl: string | null;
  ratings: number; // 1–5 звёзд
};

// Выбор пользователя в панели фильтров.
export type FilterState = {
  query: string;
  genres: string[];
  year: number | null; // null = «любой год»
  rating: number | null; // null = «любой рейтинг»
  associations: string[];
};
