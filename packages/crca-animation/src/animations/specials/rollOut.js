import { css } from "lit";

export const rollOut = css` /* originally authored by Nick Pettit - https://github.com/nickpettit/glide */

@keyframes rollOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
  }
}

.rollOut {
  animation-name: rollOut;
}
`;
