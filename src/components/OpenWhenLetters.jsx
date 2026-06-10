import { useState } from "react";
import { openWhenLetters } from "../data/content";
import Modal from "./Modal";
import Emoji from "./Emoji";
import EmojiText from "./EmojiText";
import "./OpenWhenLetters.css";

function OpenWhenLetters() {
  const [selected, setSelected] = useState(null);
  const [openedIds, setOpenedIds] = useState(new Set());

  const openLetter = (letter) => {
    setSelected(letter);
    setOpenedIds((prev) => new Set([...prev, letter.id]));
  };

  return (
    <section id="letters" className="section letters-section">
      <h2 className="section-title">Open When......</h2>

      <div className="letters-grid">
        {openWhenLetters.map((letter, i) => (
          <button
            key={letter.id}
            className={`letter-envelope glass-card ${openedIds.has(letter.id) ? "opened" : ""}`}
            onClick={() => openLetter(letter)}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span className="envelope-emoji"><Emoji size="2rem">{letter.emoji}</Emoji></span>
            <span className="envelope-prefix">Open when...</span>
            <span className="envelope-label">
              {letter.label.replace("Open when ", "")}
            </span>
            {openedIds.has(letter.id) && (
              <span className="envelope-read"><EmojiText>💌 Read</EmojiText></span>
            )}
            <div className="envelope-seal"><Emoji size="1.2rem">🩷</Emoji></div>
          </button>
        ))}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.label}
        theme={selected?.id}
      >
        {selected?.message && <EmojiText>{selected.message}</EmojiText>}
      </Modal>
    </section>
  );
}

export default OpenWhenLetters;
