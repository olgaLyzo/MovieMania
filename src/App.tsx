import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Footer } from "./components/layout/Footer/Footer";
import { Hero } from "./components/layout/Hero/Hero";
import { NavBar } from "./components/layout/NavBar/NavBar";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { HomePage } from "./pages/HomePage/HomePage";

// Шапка и меню общие для всех страниц; меняется только содержимое Routes.
export default function App() {
  const { pathname } = useLocation();

  // Новая страница открывается с самого верха.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Hero />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Неизвестный адрес ведёт на главную */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
