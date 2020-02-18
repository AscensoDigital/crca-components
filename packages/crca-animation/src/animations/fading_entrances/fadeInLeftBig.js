import { css } from "lit-element";

export const fadeInLeftBig = css` @keyframes fadeInLeftBig {
  from {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeftBig {
  animation-name: fadeInLeftBig;
}
`;
