export const UPDATE_METADATA = "UPDATE_METADATA";

export const crcaMetadataUpdateMetadata = metadata => {
  return {
    type: UPDATE_METADATA,
    metadata,
  };
};