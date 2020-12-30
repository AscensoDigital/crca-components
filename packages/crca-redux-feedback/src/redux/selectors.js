import { createSelector } from 'reselect';

const crcaFeedbackStateSelector = state => (state && state.crcaFeedback) || {};

export const crcaFeedbackFeedbackSelector = createSelector(
  crcaFeedbackStateSelector,
  feed => feed.feedback || null
);
