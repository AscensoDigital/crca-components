import { css } from "lit";

export const lightSpeedOut = css` @keyframes lightSpeedOut {
  from {
    opacity: 1;
  }

  to {
    transform: translate3d(100%, 0, 0) skewX(30deg);
    opacity: 0;
  }
}

.lightSpeedOut {
  animation-name: lightSpeedOut;
  animation-timing-function: ease-in;
}
`;
