import Emoji from "./Emoji";

const EMOJI_RE = /\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*/gu;

function parseEmojiText(text) {
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = EMOJI_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "emoji", value: match[0] });
    lastIndex = EMOJI_RE.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return parts;
}

function EmojiText({ children, size = "1.1em", className = "" }) {
  if (typeof children !== "string") return children;

  const parts = parseEmojiText(children);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.type === "emoji" ? (
          <Emoji key={i} size={size}>
            {part.value}
          </Emoji>
        ) : (
          <span key={i}>{part.value}</span>
        )
      )}
    </span>
  );
}

export default EmojiText;
