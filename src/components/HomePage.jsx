import { useState } from "react";
import Emoji from "./Emoji";
import EmojiText from "./EmojiText";
import "./HomePage.css";

function HomePage() {
  const [opened, setOpened] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const openGift = () => {
    if (opened) return;
    setOpened(true);

    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${20 + Math.random() * 60}%`,
      delay: `${Math.random() * 0.8}s`,
      color: ["#e91e8c", "#f06292", "#f48fb1", "#fce4ec", "#ff6eb4", "#c2185b"][
        Math.floor(Math.random() * 6)
      ],
      emoji: ["✨", "💗", "🎀", "⭐", "🌸"][Math.floor(Math.random() * 5)],
    }));
    setConfetti(pieces);
  };

  return (
    <section id="home" className={`section home-section ${opened ? "home-section--opened" : ""}`}>
      <div className={`gift-scene ${opened ? "opened" : ""}`}>
        {!opened && (
          <button className="gift-box" onClick={openGift} aria-label="Open your birthday gift">
            <div className="gift-lid">
              <div className="gift-bow"><Emoji size="3rem">🎀</Emoji></div>
            </div>
            <div className="gift-body">
              <div className="gift-ribbon-v" />
              <div className="gift-ribbon-h" />
            </div>
            <p className="gift-hint"><EmojiText>Tap to open your gift, Carol ✨</EmojiText></p>
          </button>
        )}

        {opened && (
          <div className="birthday-reveal">
            <div className="reveal-sparkle"><Emoji size="3rem">✨</Emoji></div>
            <h1 className="reveal-title">
              Happy Birthday,
              <span className="reveal-name">Carol</span>
            </h1>
            <p className="reveal-subtitle">
              A little world of love, made just for you, by Sky
            </p>
            <div className="reveal-hearts">
              {["💕", "🦋", "🌸", "✨", "💗", "🎀", "🌺",].map((h, i) => (
                <span key={i} className="reveal-heart" style={{ animationDelay: `${i * 0.15}s` }}>
                  <Emoji size="1.5rem">{h}</Emoji>
                </span>
              ))}
            </div>
            <button
              className="btn-pink explore-btn"
              onClick={() => document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })}
            >
              Begin the magic →
            </button>
          </div>
        )}

        {confetti.map((c) => (
          <span
            key={c.id}
            className="confetti-piece"
            style={{
              left: c.left,
              animationDelay: c.delay,
              color: c.color,
            }}
          >
            <Emoji size="1.2rem">{c.emoji}</Emoji>
          </span>
        ))}
      </div>

      {opened && (
        <div className="home-welcome glass-card">
          <p>
          You are my favorite everything. I love you so much.
          </p>
        </div>
      )}
    </section>
  );
}

export default HomePage;
