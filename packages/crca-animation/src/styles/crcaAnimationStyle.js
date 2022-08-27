import { css } from "lit";

export const crcaAnimationStyle = css`
.crcaAnimated {
  animation-duration: var(--crca-animation-animation-duration, 1s);
  animation-delay: var(--crca-animation-animation-delay, 0);
  animation-fill-mode: both;
}
@media (print), (prefers-reduced-motion: reduce) {
  .crcaAnimated {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;