import { css } from "lit";

export const bounceOutLeft = css` @keyframes bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0);
  }
}

.bounceOutLeft {
  animation-name: bounceOutLeft;
}
`;
