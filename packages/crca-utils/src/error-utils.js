export const sendErrorDiscord = (
  discordUrl,
  error,
  data = {},
  tag = null,
) => {
  console.log('Process Error - discordUrl: ', discordUrl);
  console.log('Process Error - error: ', error);
  console.log('Process Error - data: ',data);
  console.log('Process Error - tag: ',tag);
  const content = {
    tag,
    data,
    error
  }
  jsonPost(discordUrl, { content });
};
