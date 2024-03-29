import { css } from "lit";

export const rotateInUpLeft = css` @keyframes rotateInUpLeft {
  from {
    transform-origin: left bottom;
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }

  to {
    transform-origin: left bottom;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.rotateInUpLeft {
  animation-name: rotateInUpLeft;
}
`;
