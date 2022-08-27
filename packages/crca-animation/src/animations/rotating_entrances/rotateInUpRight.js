import { css } from "lit";

export const rotateInUpRight = css` @keyframes rotateInUpRight {
  from {
    transform-origin: right bottom;
    transform: rotate3d(0, 0, 1, -90deg);
    opacity: 0;
  }

  to {
    transform-origin: right bottom;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.rotateInUpRight {
  animation-name: rotateInUpRight;
}
`;
