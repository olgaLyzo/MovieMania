import { ASSOCIATION_OPTIONS, GENRE_OPTIONS } from "../data/filterOptions";
import type { FilterOption } from "../data/filterOptions";
import type { Dispatch } from "react";
import type { FilterState } from "../types/movie";

// Чистая логика состояния каталога (без React-компонентов): её легко тестировать.

export const PAGE_SIZE = 20; // сколько фильмов показываем сначала
export const STEP = 10; // на сколько больше по кнопке «Показать больше»

export const initialFilters: FilterState = {
  query: "",
  genres: [],
  year: null,
  rating: null,
  associations: [],
};

export type FilterAction =
  | { type: "setQuery"; query: string }
  | { type: "toggleGenre"; genre: string }
  | { type: "setYear"; year: number | null }
  | { type: "setRating"; rating: number | null }
  | { type: "toggleAssociation"; association: string }
  | { type: "reset" };

export type FilterDispatch = Dispatch<FilterAction>;

function toggle(list: readonly string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

// По текущему выбору и действию возвращает новый выбор.
export function filtersReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "setQuery":
      return { ...state, query: action.query };
    case "toggleGenre":
      return { ...state, genres: toggle(state.genres, action.genre) };
    case "setYear":
      return state.year === action.year ? state : { ...state, year: action.year };
    case "setRating":
      return state.rating === action.rating ? state : { ...state, rating: action.rating };
    case "toggleAssociation":
      return { ...state, associations: toggle(state.associations, action.association) };
    case "reset":
      return initialFilters;
  }
}

function labelsOf(options: readonly FilterOption[], values: readonly string[]): string[] {
  return values.map((value) => options.find((o) => o.value === value)?.label ?? value);
}

// Список для строки «Выбрано: …». Порядок как в панели: поиск, жанры, год, рейтинг, ассоциации.
export function describeFilters(filters: FilterState): string[] {
  const query = filters.query.trim();
  return [
    ...(query ? [`название «${query}»`] : []),
    ...labelsOf(GENRE_OPTIONS, filters.genres),
    ...(filters.year !== null ? [String(filters.year)] : []),
    ...(filters.rating !== null ? [`рейтинг ${filters.rating} из 5`] : []),
    ...labelsOf(ASSOCIATION_OPTIONS, filters.associations),
  ];
}

// --- Каталог = фильтры + сколько фильмов запрошено показать ---------------
export type CatalogState = {
  filters: FilterState;
  requested: number;
};

export const initialCatalog: CatalogState = {
  filters: initialFilters,
  requested: PAGE_SIZE,
};

export type CatalogAction = FilterAction | { type: "showMore" } | { type: "showFirstPage" };

export function catalogReducer(state: CatalogState, action: CatalogAction): CatalogState {
  switch (action.type) {
    case "showMore":
      return { ...state, requested: state.requested + STEP };
    case "showFirstPage":
      return { ...state, requested: PAGE_SIZE };
    case "reset":
      return initialCatalog;
    default: {
      // Изменился выбор: показ начинается сначала. Не изменился: ничего не трогаем.
      const filters = filtersReducer(state.filters, action);
      return filters === state.filters ? state : { filters, requested: PAGE_SIZE };
    }
  }
}
