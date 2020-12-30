export const SEND_FEEDBACK = 'SEND_FEEDBACK';

const sendFeedback = feedback => ({
  type: SEND_FEEDBACK,
  feedback,
});

export const infoFeedback = msg =>
  sendFeedback({
    msg,
    status: 'neutral',
  });

export const negativeFeedback = msg =>
  sendFeedback({
    msg,
    status: 'error',
  });

export const positiveFeedback = msg =>
  sendFeedback({
    msg,
    status: 'success',
  });
