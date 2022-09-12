import { createSelector } from "reselect";

import { crcaFirebaseStateSelector } from "./app-selectors.js";

export const crcaFirebaseFirestoreInitSelector = createSelector(
  crcaFirebaseStateSelector,
  fb => fb.firestoreInit || false
);