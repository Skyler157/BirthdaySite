import "./EmptyBasket.css";

function EmptyBasket({ size = 64 }) {
  return (
    <svg
      className="empty-basket"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="32" cy="54" rx="22" ry="5" fill="rgba(45, 10, 30, 0.25)" />
      <path
        d="M14 28c0-2 2-4 4-4h28c2 0 4 2 4 4v4H14v-4z"
        fill="#f48fb1"
        stroke="#c2185b"
        strokeWidth="1.5"
      />
      <path
        d="M12 32h40l-3 18c-.5 3-3 5-6 5H21c-3 0-5.5-2-6-5l-3-18z"
        fill="#fce4ec"
        stroke="#e91e8c"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18 32v14M24 32v16M32 32v17M40 32v16M46 32v14"
        stroke="#f06292"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M12 32c8-2 16-2 24 0s16 2 24 0"
        stroke="#c2185b"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M28 24c0-6 8-6 8 0"
        stroke="#e91e8c"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 24v8"
        stroke="#e91e8c"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default EmptyBasket;
