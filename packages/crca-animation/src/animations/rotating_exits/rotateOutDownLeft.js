import { css } from "lit";

export const rotateOutDownLeft = css` @keyframes rotateOutDownLeft {
  from {
    transform-origin: left bottom;
    opacity: 1;
  }

  to {
    transform-origin: left bottom;
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }
}

.rotateOutDownLeft {
  animation-name: rotateOutDownLeft;
}
`;
