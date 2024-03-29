import { css } from "lit";

export const flipOutY = css` @keyframes flipOutY {
  from {
    transform: perspective(400px);
  }

  30% {
    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    opacity: 1;
  }

  to {
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    opacity: 0;
  }
}

.flipOutY {
  animation-duration: 0.75s;
  backface-visibility: visible !important;
  animation-name: flipOutY;
}
`;
