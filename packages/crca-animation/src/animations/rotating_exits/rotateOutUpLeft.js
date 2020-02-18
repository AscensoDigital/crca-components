import { css } from "lit-element";

export const rotateOutUpLeft = css` @keyframes rotateOutUpLeft {
  from {
    transform-origin: left bottom;
    opacity: 1;
  }

  to {
    transform-origin: left bottom;
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }
}

.rotateOutUpLeft {
  animation-name: rotateOutUpLeft;
}
`;
