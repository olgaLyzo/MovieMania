import styles from "./Chip.module.scss";

type ChipProps = {
  label: string;
  selected: boolean;
  onToggle: () => void;
};

// Кнопка-«таблетка» для выбора жанров и ассоциаций.
// aria-pressed сообщает скринридеру, выбрана ли она.
export function Chip({ label, selected, onToggle }: ChipProps) {
  return (
    <button
      type="button"
      className={selected ? `${styles.chip} ${styles.selected}` : styles.chip}
      aria-pressed={selected}
      onClick={onToggle}
    >
      {label}
    </button>
  );
}
