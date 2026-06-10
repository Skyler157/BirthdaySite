import { useState } from "react";
import { getAppleEmojiUrl } from "../utils/appleEmoji";
import "./Emoji.css";

function Emoji({ children, size = "1.2em", className = "", alt = "", label }) {
  const emoji = typeof children === "string" ? children.trim() : "";
  const [failed, setFailed] = useState(false);

  if (!emoji || failed) {
    return (
      <span className={`emoji-fallback ${className}`} style={{ fontSize: size }} aria-hidden={!label}>
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={getAppleEmojiUrl(emoji)}
      alt={alt || label || emoji}
      aria-label={label || alt || undefined}
      className={`apple-emoji ${className}`}
      style={{ width: size, height: size }}
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

export default Emoji;
