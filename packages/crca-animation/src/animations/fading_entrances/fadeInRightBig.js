import { css } from "lit-element";

export const fadeInRightBig = css` @keyframes fadeInRightBig {
  from {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRightBig {
  animation-name: fadeInRightBig;
}
`;
