import { useEffect, useState } from "react";
import FloatingBackground from "./components/FloatingBackground";
import ConstellationNav from "./components/ConstellationNav";
import HomePage from "./components/HomePage";
import GamesSection from "./components/GamesSection";
import OpenWhenLetters from "./components/OpenWhenLetters";
import NoteFromSky from "./components/NoteFromSky";
import EmojiText from "./components/EmojiText";
import "./App.css";

const SECTIONS = ["home", "games", "letters", "note"];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [gameFocus, setGameFocus] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-60px 0px -90px 0px" }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <FloatingBackground />
      <ConstellationNav activeSection={activeSection} hidden={gameFocus} />
      <main className="app-main">
        <HomePage />
        <GamesSection onGameFocusChange={setGameFocus} />
        <OpenWhenLetters />
        <NoteFromSky />
      </main>
      <footer className="app-footer">
        <p><EmojiText>Made with 💕 by Sky</EmojiText></p>
      </footer>
    </div>
  );
}

export default App;
