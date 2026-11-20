// Списки для панели фильтров. value совпадает с кодами в movies.json,
// label это то, что видит пользователь.

export type FilterOption = {
  value: string;
  label: string;
};

export const GENRE_OPTIONS: readonly FilterOption[] = [
  { value: "action", label: "Боевик" },
  { value: "comedy", label: "Комедия" },
  { value: "drama", label: "Драма" },
  { value: "thriller", label: "Триллер" },
  { value: "horror", label: "Ужасы" },
  { value: "sci-fi", label: "Фантастика" },
  { value: "fantasy", label: "Фэнтези" },
  { value: "romance", label: "Мелодрама" },
  { value: "animation", label: "Мультфильм" },
  { value: "adventure", label: "Приключения" },
  { value: "detective", label: "Детектив" },
  { value: "documentary", label: "Документальный" },
];

// Ассоциации сопоставляются с полем moods у фильма.
export const ASSOCIATION_OPTIONS: readonly FilterOption[] = [
  { value: "autumn", label: "Осенние" },
  { value: "cozy", label: "Уютные" },
  { value: "summer", label: "Летние" },
  { value: "motivating", label: "Мотивирующие" },
  { value: "true-story", label: "На реальных событиях" },
  { value: "gritty", label: "Жёсткие" },
  { value: "psychological", label: "Психологические" },
  { value: "family", label: "Семейные" },
  { value: "dance", label: "Танцевальные" },
  { value: "female", label: "Женские" },
  { value: "male", label: "Мужские" },
  { value: "kids", label: "Детские" },
  { value: "romantic", label: "Романтические" },
];

// Верхняя граница года считается от текущей даты, чтобы не устаревать.
export const YEAR_RANGE = {
  min: 1950,
  max: new Date().getFullYear(),
} as const;

// Жанры, которые есть в данных, но для которых нет кнопки в панели фильтров.
const EXTRA_GENRE_LABELS: Readonly<Record<string, string>> = {
  music: "Музыка",
  musical: "Мюзикл",
};

// Название жанра по коду. Неизвестный код показываем как есть, а не прячем.
export function genreLabel(code: string): string {
  return GENRE_OPTIONS.find((option) => option.value === code)?.label ?? EXTRA_GENRE_LABELS[code] ?? code;
}
