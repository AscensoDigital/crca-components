import firebase from 'firebase/app';
import { isDefined } from '@ascenso/crca-utils';

export const dateFirebase2Js = date => {
  if (!isDefined(date)) {
    return null;
  }
  // eslint-disable-next-line no-undef
  const timestamp = new firebase.firestore.Timestamp(
    date.seconds,
    date.nanoseconds
  );
  return timestamp.toDate();
};