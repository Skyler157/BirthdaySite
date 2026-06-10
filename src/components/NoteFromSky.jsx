import { noteFromSky } from "../data/content";
import Emoji from "./Emoji";
import "./NoteFromSky.css";

function NoteFromSky() {
  return (
    <section id="note" className="section note-section">
      <h2 className="section-title">Dearest Gentle Reader</h2>

      <article className="sky-note">
        <div className="note-texture" aria-hidden="true" />
        <div className="note-corner note-corner-tl"><Emoji size="1.5rem">🌸</Emoji></div>
        <div className="note-corner note-corner-br"><Emoji size="1.5rem">✨</Emoji></div>

        <p className="note-greeting">{noteFromSky.greeting}</p>

        <div className="note-divider">
          <span className="divider-ornament">✦</span>
          <span className="divider-line" />
          <span className="divider-heart"><Emoji size="1.1rem">💗</Emoji></span>
          <span className="divider-line" />
          <span className="divider-ornament">✦</span>
        </div>

        <div className="note-body">
          {noteFromSky.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="note-divider note-divider-bottom">
          <span className="divider-line" />
          <span className="divider-ornament">♡</span>
          <span className="divider-line" />
        </div>

        <footer className="note-footer">
          <p className="note-closing">{noteFromSky.closing}</p>
          <p className="note-signature">
            {noteFromSky.signature}
            <span className="signature-emoji"><Emoji size="1.3rem">{noteFromSky.signatureEmoji}</Emoji></span>
          </p>
        </footer>
      </article>
    </section>
  );
}

export default NoteFromSky;
