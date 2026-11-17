import { Link } from "react-router";
import { useGoHome } from "../../../hooks/useGoHome";
import styles from "./Footer.module.scss";

const EMAIL = "volhalyzo@gmail.com";
const INSTAGRAM_HANDLE = "olga_lyzo";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Футер: название, навигация, контакты (значок : контакт), кнопка «Наверх»
// и узкая правовая строка.
export function Footer() {
  const goHome = useGoHome();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.logo}>
          Movie<span className={styles.accent}>Mania</span>
        </p>

        <nav aria-label="Навигация в футере">
          <h2 className={styles.heading}>Навигация</h2>
          <ul className={styles.list}>
            <li>
              <Link to="/" onClick={goHome}>
                Главная
              </Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Контакты</h2>
          <ul className={styles.list}>
            <li className={styles.contact}>
              <svg className={styles.icon} viewBox="0 0 24 24" role="img" aria-label="Почта">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <span aria-hidden="true">:</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li className={styles.contact}>
              <svg className={styles.icon} viewBox="0 0 24 24" role="img" aria-label="Instagram">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span aria-hidden="true">:</span>
              <a
                href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>

        <button type="button" className={styles.up} aria-label="Наверх" onClick={scrollToTop}>
          &#8593;
        </button>
      </div>

      <p className={styles.legal}>
        Постеры принадлежат правообладателям и используются в ознакомительных целях &nbsp;·&nbsp;
        MovieMania не хранит и не распространяет фильмы, ссылки на просмотр ведут на сторонние
        сайты &nbsp;·&nbsp; © 2026 MovieMania
      </p>
    </footer>
  );
}
