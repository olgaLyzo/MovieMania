import { useCallback } from "react";
import { useCatalog } from "../context/CatalogContext";

// Действие «На главную»: сбросить фильтры и плавно вернуться наверх.
// Общее для заголовка в шапке и вкладки «Главная» в меню.
export function useGoHome() {
  const { dispatch } = useCatalog();
  return useCallback(() => {
    dispatch({ type: "reset" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch]);
}
