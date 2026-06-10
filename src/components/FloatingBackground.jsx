import { useMemo } from "react";
import Emoji from "./Emoji";
import "./FloatingBackground.css";

const EMOJIS = [
  "🦋", "✨", "🌸", "💗", "🎀", "⭐", "🌺", "💕", "🌷", "💖",
  "🪷", "💝", "🌹", "🩷", "💫", "🎗️", "🌼", "💞", "🦩", "🌷",
];

function FloatingBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        delay: `${Math.random() * 5}s`,
        duration: `${2 + Math.random() * 3}s`,
      })),
    []
  );

  const floaters = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        emoji: EMOJIS[i % EMOJIS.length],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 20}s`,
        duration: `${15 + Math.random() * 20}s`,
        size: 0.8 + Math.random() * 0.8,
      })),
    []
  );

  return (
    <div className="floating-bg" aria-hidden="true">
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />

      {stars.map((star) => (
        <span
          key={star.id}
          className="bg-star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}

      {floaters.map((f) => (
        <span
          key={f.id}
          className="bg-emoji"
          style={{
            left: f.left,
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        >
          <Emoji size={`${f.size * 1.5}rem`}>{f.emoji}</Emoji>
        </span>
      ))}

      <div className="shooting-star" />
    </div>
  );
}

export default FloatingBackground;
