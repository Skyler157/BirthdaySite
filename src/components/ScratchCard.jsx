import { useRef, useState, useEffect, useCallback } from "react";
import { scratchMessage } from "../data/content";
import EmojiText from "./EmojiText";
import "./ScratchCard.css";

function ScratchCard({ onFocusChange }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#c2185b");
    gradient.addColorStop(0.5, "#e91e8c");
    gradient.addColorStop(1, "#f06292");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.font = "600 17px Quicksand, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ Scratch to reveal ✨", rect.width / 2, rect.height / 2);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  useEffect(() => {
    onFocusChange?.(scratching && !revealed);
  }, [scratching, revealed, onFocusChange]);

  useEffect(() => () => onFocusChange?.(false), [onFocusChange]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    setScratching(true);
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const pct = transparent / (imageData.data.length / 4);
    if (pct > 0.4) setRevealed(true);
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    isDrawing.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const handlePointerUp = () => {
    if (isDrawing.current) checkReveal();
    isDrawing.current = false;
  };

  const reset = () => {
    setRevealed(false);
    setScratching(false);
    setTimeout(initCanvas, 50);
  };

  return (
    <div className="scratch-card glass-card">
      <h3 className="game-title">Birthday Scratch Card</h3>
      <p className="game-desc">
        <EmojiText>It's okay, you can rub me. Don't be shy 😂</EmojiText>
      </p>

      <div className="scratch-container" ref={containerRef}>
        <div className="scratch-reveal">
          <h4>{scratchMessage.title}</h4>
          <div className="scratch-message">
            {scratchMessage.body.split("\n").map((line, i) => (
              <p key={i}>{line ? <EmojiText>{line}</EmojiText> : <br />}</p>
            ))}
          </div>
        </div>

        {!revealed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
        )}

        {revealed && (
          <div className="scratch-revealed-overlay">
            <span className="revealed-badge">
              <EmojiText>🎂 Revealed!</EmojiText>
            </span>
          </div>
        )}
      </div>

      {(scratching || revealed) && (
        <button className="btn-pink scratch-reset" onClick={reset}>
          {revealed ? "Scratch Again" : "Reset"}
        </button>
      )}
    </div>
  );
}

export default ScratchCard;
