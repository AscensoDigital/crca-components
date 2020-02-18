import { css } from "lit-element";

export const fadeOutLeftBig = css` @keyframes fadeOutLeftBig {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0);
  }
}

.fadeOutLeftBig {
  animation-name: fadeOutLeftBig;
}
`;
