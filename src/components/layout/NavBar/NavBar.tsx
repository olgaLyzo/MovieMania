import { NavLink } from "react-router";
import { useGoHome } from "../../../hooks/useGoHome";
import styles from "./NavBar.module.scss";

// NavLink сам знает, открыта ли его страница: добавляет aria-current="page"
// и передаёт isActive, по которому мы подсвечиваем вкладку.
function tabClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.tab} ${styles.active}` : styles.tab;
}

export function NavBar() {
  const goHome = useGoHome();

  return (
    <nav className={styles.nav} aria-label="Основное меню">
      <NavLink to="/" end className={tabClass} onClick={goHome}>
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z" />
        </svg>
        Главная
      </NavLink>
      <NavLink to="/about" className={tabClass}>
        О нас
      </NavLink>
    </nav>
  );
}
