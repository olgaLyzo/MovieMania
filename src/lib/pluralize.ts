type PluralForms = readonly [one: string, few: string, many: string];

// Выбирает форму слова для числа: 1 фильм, 2 фильма, 5 фильмов.
export function pluralize(count: number, forms: PluralForms): string {
  const lastTwo = count % 100;
  const last = count % 10;

  if (lastTwo > 10 && lastTwo < 20) return forms[2];
  if (last === 1) return forms[0];
  if (last >= 2 && last <= 4) return forms[1];
  return forms[2];
}

export function pluralizeMovies(count: number): string {
  return pluralize(count, ["фильм", "фильма", "фильмов"]);
}
