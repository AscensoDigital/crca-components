import { createSelector } from "reselect";

const crcaMetadataStateSelector = state => state && state.crcaMetadata || {};

export const crcaMetadataMetadataSelector = createSelector(
  crcaMetadataStateSelector,
  meta => meta.metadata || {}
)