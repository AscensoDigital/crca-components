import { css } from "lit";

export const rotateOutUpRight = css` @keyframes rotateOutUpRight {
  from {
    transform-origin: right bottom;
    opacity: 1;
  }

  to {
    transform-origin: right bottom;
    transform: rotate3d(0, 0, 1, 90deg);
    opacity: 0;
  }
}

.rotateOutUpRight {
  animation-name: rotateOutUpRight;
}
`;
