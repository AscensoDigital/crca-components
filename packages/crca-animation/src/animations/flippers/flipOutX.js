import { css } from "lit-element";

export const flipOutX = css` @keyframes flipOutX {
  from {
    transform: perspective(400px);
  }

  30% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }

  to {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.flipOutX {
  animation-duration: 0.75s;
  animation-name: flipOutX;
  backface-visibility: visible !important;
}
`;
