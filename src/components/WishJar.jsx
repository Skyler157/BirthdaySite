import { useEffect, useState } from "react";
import { wishJarAffirmations } from "../data/content";
import Emoji from "./Emoji";
import EmojiText from "./EmojiText";
import "./WishJar.css";

function WishJar({ onFocusChange }) {
  const [currentWish, setCurrentWish] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [usedWishes, setUsedWishes] = useState([]);
  const [sparkle, setSparkle] = useState(false);

  useEffect(() => {
    onFocusChange?.(isDrawing);
  }, [isDrawing, onFocusChange]);

  useEffect(() => () => onFocusChange?.(false), [onFocusChange]);

  const drawWish = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setSparkle(true);

    setTimeout(() => {
      const available = wishJarAffirmations.filter((w) => !usedWishes.includes(w));
      const pool = available.length > 0 ? available : wishJarAffirmations;
      const wish = pool[Math.floor(Math.random() * pool.length)];

      if (available.length === 0) setUsedWishes([wish]);
      else setUsedWishes((prev) => [...prev, wish]);

      setCurrentWish(wish);
      setIsDrawing(false);
      setTimeout(() => setSparkle(false), 600);
    }, 800);
  };

  return (
    <div className="wish-jar glass-card">
      <h3 className="game-title">The Wish Jar</h3>
      <p className="game-desc">
        Pick a birthday wish from the jar! 🌷
      </p>

      <div className={`jar-scene ${isDrawing ? "shaking" : ""} ${sparkle ? "sparkling" : ""}`}>
        <div className="jar-lid"><Emoji size="1.5rem">✨</Emoji></div>
        <div className="jar-body">
          <div className="jar-glow" />
          <div className="jar-papers">
            {["💕", "✨", "🌸", "💖", "⭐"].map((e, i) => (
              <span key={i} className="jar-paper" style={{ animationDelay: `${i * 0.1}s` }}>
                <Emoji size="1.2rem">{e}</Emoji>
              </span>
            ))}
          </div>
          <span className="jar-label">Wishes for Lynn</span>
        </div>
        <div className="jar-base" />
      </div>

      <button className="btn-pink jar-btn" onClick={drawWish} disabled={isDrawing}>
        {isDrawing ? "Drawing a wish..." : <EmojiText>Pull a Wish ✨</EmojiText>}
      </button>

      {currentWish && (
        <div className="wish-reveal" key={currentWish}>
          <div className="wish-paper">
            <span className="wish-deco"><Emoji size="1.2rem">🎀</Emoji></span>
            <p>{currentWish}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WishJar;
