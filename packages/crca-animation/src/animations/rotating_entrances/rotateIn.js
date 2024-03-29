import { css } from "lit";

export const rotateIn = css` @keyframes rotateIn {
  from {
    transform-origin: center;
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    transform-origin: center;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.rotateIn {
  animation-name: rotateIn;
}
`;
