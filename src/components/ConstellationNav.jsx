import { useEffect, useState } from "react";
import { navSections } from "../data/content";
import Emoji from "./Emoji";
import "./ConstellationNav.css";

const STAR_POSITIONS = [
  { x: 50, y: 12 },
  { x: 22, y: 38 },
  { x: 78, y: 38 },
  { x: 50, y: 62 },
];

const CONNECTIONS = [
  [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [1, 2],
];

function ConstellationNav({ activeSection, hidden = false }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`constellation-nav ${visible ? "visible" : ""} ${hidden ? "nav-game-hidden" : ""}`}
      aria-label="Constellation navigation"
    >
      <svg className="constellation-lines" viewBox="0 0 100 70" preserveAspectRatio="xMidYMid meet">
        {CONNECTIONS.map(([a, b], i) => (
          <line
            key={i}
            x1={STAR_POSITIONS[a].x}
            y1={STAR_POSITIONS[a].y}
            x2={STAR_POSITIONS[b].x}
            y2={STAR_POSITIONS[b].y}
            className="constellation-line"
          />
        ))}
      </svg>

      <div className="constellation-stars">
        {navSections.map((section, i) => {
          const pos = STAR_POSITIONS[i];
          const isActive = activeSection === section.id;
          const isHovered = hovered === section.id;

          return (
            <button
              key={section.id}
              className={`constellation-star ${isActive ? "active" : ""} ${isHovered ? "hovered" : ""}`}
              style={{ "--star-x": `${pos.x}%`, "--star-y": `${pos.y}%` }}
              onClick={() => scrollTo(section.id)}
              onMouseEnter={() => setHovered(section.id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="star-core" />
              <span className="star-glow" />
              <span className="star-icon"><Emoji size="1.1rem">{section.icon}</Emoji></span>
              <span className="star-label">{section.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default ConstellationNav;
