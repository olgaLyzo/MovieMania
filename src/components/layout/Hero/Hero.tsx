import { Link } from "react-router";
import clapperboard from "../../../assets/hero/clapperboard.svg";
import popcorn from "../../../assets/hero/popcorn.svg";
import reel from "../../../assets/hero/reel.svg";
import ticket from "../../../assets/hero/ticket.svg";
import { useGoHome } from "../../../hooks/useGoHome";
import styles from "./Hero.module.scss";

// Кинематографические иллюстрации шапки: слева «съёмочная» пара
// (хлопушка + бобина), справа «зрительская» (попкорн + билет).
// Положение каждой задаётся классом в Hero.module.scss.
const art = [
  { src: clapperboard, className: styles.clapperboard },
  { src: reel, className: styles.reel },
  { src: popcorn, className: styles.popcorn },
  { src: ticket, className: styles.ticket },
];

// Шапка сайта: заголовок-ссылка на главную, 3D-шары, киноплёнка и иллюстрации.
// Всё декоративное скрыто от скринридеров (aria-hidden и пустой alt).
export function Hero() {
  const goHome = useGoHome();

  return (
    <header className={styles.hero}>
      <div className={`${styles.film} ${styles.filmTop}`} aria-hidden="true">
        <span className={styles.filmHoles} />
      </div>
      <div className={`${styles.film} ${styles.filmBottom}`} aria-hidden="true">
        <span className={styles.filmHoles} />
      </div>

      <span className={`${styles.sphere} ${styles.pink}`} aria-hidden="true" />
      <span className={`${styles.sphere} ${styles.green}`} aria-hidden="true" />
      <span className={`${styles.sphere} ${styles.goldLeft}`} aria-hidden="true" />
      <span className={`${styles.sphere} ${styles.goldRight}`} aria-hidden="true" />

      {art.map(({ src, className }) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={`${styles.art} ${className}`}
        />
      ))}

      <h1 className={styles.title}>
        <Link to="/" className={styles.titleLink} onClick={goHome}>
          <span className={styles.line}>Enjoy Your</span>
          <span className={styles.accent}>MovieMania</span>
        </Link>
      </h1>
      <p className={styles.tagline}>Найди фильм под своё настроение</p>
    </header>
  );
}
