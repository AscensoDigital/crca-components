import { css } from "lit";

export const bounceOutRight = css` @keyframes bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
}

.bounceOutRight {
  animation-name: bounceOutRight;
}
`;
