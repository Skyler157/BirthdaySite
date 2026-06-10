import { useCallback, useEffect, useRef, useState } from "react";
import { compliments } from "../data/content";
import Emoji from "./Emoji";
import EmojiText from "./EmojiText";
import EmptyBasket from "./EmptyBasket";
import "./CatchCompliments.css";

const ITEMS = ["⭐", "💗", "✨", "💖", "🌟"];
const PAUSE_MS = 4000;

function CatchCompliments({ onFocusChange }) {
  const arenaRef = useRef(null);
  const basketXRef = useRef(50);
  const pauseTimerRef = useRef(null);
  const [basketX, setBasketX] = useState(50);
  const [falling, setFalling] = useState([]);
  const [caught, setCaught] = useState([]);
  const [currentCompliment, setCurrentCompliment] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const complimentIndex = useRef(0);
  const nextId = useRef(0);

  const moveBasket = useCallback((clientX) => {
    if (!arenaRef.current || paused) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    const x = Math.max(6, Math.min(94, pct));
    basketXRef.current = x;
    setBasketX(x);
  }, [paused]);

  const showCompliment = useCallback((compliment) => {
    setCurrentCompliment(compliment);
    setPaused(true);
    setFalling([]);

    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setPaused(false);
    }, PAUSE_MS);
  }, []);

  useEffect(() => {
    onFocusChange?.(playing && !gameComplete);
  }, [playing, gameComplete, onFocusChange]);

  useEffect(() => {
    return () => {
      onFocusChange?.(false);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [onFocusChange]);

  const spawnItem = useCallback(() => {
    if (!arenaRef.current) return;
    const id = nextId.current++;
    setFalling((prev) => [
      ...prev,
      {
        id,
        x: 10 + Math.random() * 80,
        emoji: ITEMS[Math.floor(Math.random() * ITEMS.length)],
        speed: 0.4 + Math.random() * 0.5,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!playing || gameComplete || paused) return;

    const spawnInterval = setInterval(spawnItem, 1600);
    return () => clearInterval(spawnInterval);
  }, [playing, gameComplete, paused, spawnItem]);

  useEffect(() => {
    if (!playing || gameComplete || paused) return;

    const tick = setInterval(() => {
      const basketPos = basketXRef.current;
      const basketLeft = basketPos - 12;
      const basketRight = basketPos + 12;

      setFalling((prev) => {
        const caughtItems = [];
        const remaining = [];

        prev.forEach((item) => {
          const newY = (item.y || 0) + item.speed;
          if (newY >= 85 && newY <= 98 && item.x >= basketLeft && item.x <= basketRight) {
            caughtItems.push(item);
          } else if (newY > 100) {
            /* missed */
          } else {
            remaining.push({ ...item, y: newY });
          }
        });

        if (caughtItems.length > 0) {
          const idx = complimentIndex.current % compliments.length;
          complimentIndex.current += 1;
          const compliment = compliments[idx];
          setCaught((c) => [...c, compliment]);
          showCompliment(compliment);

          if (complimentIndex.current >= compliments.length) {
            setTimeout(() => {
              setGameComplete(true);
              setPlaying(false);
            }, PAUSE_MS);
          }
        }

        return remaining;
      });
    }, 50);

    return () => clearInterval(tick);
  }, [playing, gameComplete, paused, showCompliment]);

  useEffect(() => {
    if (!playing || paused) return;

    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        const next = Math.max(6, basketXRef.current - 5);
        basketXRef.current = next;
        setBasketX(next);
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        const next = Math.min(94, basketXRef.current + 5);
        basketXRef.current = next;
        setBasketX(next);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [playing, paused]);

  const handlePointerDown = (e) => {
    if (!playing || paused) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveBasket(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!playing || paused) return;
    moveBasket(e.clientX);
  };

  const startGame = () => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    basketXRef.current = 50;
    setBasketX(50);
    setPlaying(true);
    setPaused(false);
    setCaught([]);
    setFalling([]);
    setGameComplete(false);
    complimentIndex.current = 0;
    setCurrentCompliment(null);
  };

  return (
    <div className="catch-game glass-card">
      <h3 className="game-title">Catch the Compliments</h3>
      

      {!playing && !gameComplete && (
        <button className="btn-pink" onClick={startGame}>
          <EmojiText>Start Catching ✨</EmojiText>
        </button>
      )}

      {gameComplete && (
        <div className="game-complete">
          <p>
            <EmojiText>🎉 You caught them all! Just like you catch everyone's heart. 🎉</EmojiText>
          </p>
          <button className="btn-pink" onClick={startGame}>
            Play Again
          </button>
        </div>
      )}

      {(playing || caught.length > 0) && (
        <div
          className={`catch-arena ${paused ? "catch-arena-paused" : ""}`}
          ref={arenaRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
        >
          {playing && !paused && (
            <p className="catch-hint">Tap or drag anywhere here to move the basket</p>
          )}

          {falling.map((item) => (
            <span
              key={item.id}
              className="falling-item"
              style={{ left: `${item.x}%`, top: `${item.y || 0}%` }}
            >
              <Emoji size="1.5rem">{item.emoji}</Emoji>
            </span>
          ))}

          <div className="basket" style={{ left: `${basketX}%` }}>
            <EmptyBasket size={72} />
          </div>

          {paused && currentCompliment && (
            <div className="catch-pause-overlay">
              <div className="compliment-popup compliment-popup-arena">
                <span className="compliment-sparkle">
                  <Emoji size="2rem">✨</Emoji>
                </span>
                <p className="compliment-text">{currentCompliment}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {currentCompliment && !playing && (
        <div className="compliment-popup compliment-popup-last">
          <span className="compliment-sparkle">
            <Emoji size="1.5rem">✨</Emoji>
          </span>
          <p>{currentCompliment}</p>
        </div>
      )}
    </div>
  );
}

export default CatchCompliments;
