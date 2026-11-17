import { useEffect, useRef, useState } from "react";

// Увеличивает количество до целого числа рядов: 20 карточек при 6 в ряд станут 24.
export function roundUpToFullRows(count: number, columns: number): number {
  return Math.ceil(count / columns) * columns;
}

// Следит за сеткой и сообщает, сколько карточек помещается в один ряд.
// Число меняется при изменении ширины окна (ResizeObserver).
export function useGridColumns() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Браузер возвращает ширины колонок через пробел: «165px 165px 165px»
    const update = () => {
      const count = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
      setColumns(Math.max(1, count));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return { gridRef, columns };
}
