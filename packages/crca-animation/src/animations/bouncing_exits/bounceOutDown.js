import { css } from "lit";

export const bounceOutDown = css` @keyframes bounceOutDown {
  20% {
    transform: translate3d(0, 10px, 0);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.bounceOutDown {
  animation-name: bounceOutDown;
}
`;
