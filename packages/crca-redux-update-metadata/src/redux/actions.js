export const UPDATE_METADATA = "UPDATE_METADATA";

export const updateMetadata = metadata => {
  return {
    type: UPDATE_METADATA,
    metadata,
  };
};