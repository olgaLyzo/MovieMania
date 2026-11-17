import { createContext, useContext, useMemo, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import { catalogReducer, describeFilters, initialCatalog } from "../lib/catalogState";
import type { CatalogAction, CatalogState } from "../lib/catalogState";

type CatalogContextValue = {
  state: CatalogState;
  dispatch: Dispatch<CatalogAction>;
  summary: string[]; // что выбрано, для строки «Выбрано: …»
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

// Состояние каталога живёт выше страниц, поэтому «Главная» в меню и в шапке
// может сбросить фильтры, а переход на «О нас» и обратно ничего не теряет.
// Пока состояние небольшое, хватает Context + useReducer (без Redux).
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(catalogReducer, initialCatalog);
  const value = useMemo(
    () => ({ state, dispatch, summary: describeFilters(state.filters) }),
    [state],
  );
  return <CatalogContext value={value}>{children}</CatalogContext>;
}

export function useCatalog(): CatalogContextValue {
  const value = useContext(CatalogContext);
  if (value === null) {
    throw new Error("useCatalog нужно вызывать внутри CatalogProvider");
  }
  return value;
}
