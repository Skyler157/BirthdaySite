import { useEffect, useState } from "react";
import CatchCompliments from "./CatchCompliments";
import ScratchCard from "./ScratchCard";
import WishJar from "./WishJar";
import Emoji from "./Emoji";
import "./GamesSection.css";

const GAMES = [
  { id: "catch", label: "Catch a Compliment", icon: "💕" },
  { id: "scratch", label: "Tap to Scratch", icon: "✨" },
  { id: "wish", label: "Wish Jar", icon: "🏺" },
];

function GamesSection({ onGameFocusChange }) {
  const [activeGame, setActiveGame] = useState("catch");

  useEffect(() => {
    onGameFocusChange?.(false);
  }, [activeGame, onGameFocusChange]);

  return (
    <section id="games" className="section games-section">
      <h2 className="section-title">Time To Play</h2>
      <p className="section-subtitle">
        Three little worlds of fun, each one made to make you smile
      </p>

      <div className="game-tabs">
        {GAMES.map((game) => (
          <button
            key={game.id}
            className={`game-tab ${activeGame === game.id ? "active" : ""}`}
            onClick={() => setActiveGame(game.id)}
          >
            <span className="tab-icon"><Emoji size="1.3rem">{game.icon}</Emoji></span>
            <span className="tab-label">{game.label}</span>
          </button>
        ))}
      </div>

      <div className="game-panel">
        {activeGame === "catch" && (
          <CatchCompliments onFocusChange={onGameFocusChange} />
        )}
        {activeGame === "scratch" && (
          <ScratchCard onFocusChange={onGameFocusChange} />
        )}
        {activeGame === "wish" && (
          <WishJar onFocusChange={onGameFocusChange} />
        )}
      </div>
    </section>
  );
}

export default GamesSection;
