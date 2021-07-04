import { isFunction, isObject, jsonPost } from "@ascenso/crca-utils";

export const sendErrorDiscord = (
  discordUrl,
  error,
  data = {},
  tag = null,
) => {
  // console.log('sendErrorDiscord - discordUrl: ', discordUrl);
  // console.log('sendErrorDiscord - error: ', error);
  // console.log('sendErrorDiscord - data: ',data);
  // console.log('sendErrorDiscord - tag: ',tag);
  // console.log('sendErrorDiscord isObject(error): ',isObject(error));

  const content = [`tag: ${tag}`];
  if(isObject(error) && Object.keys(error).length) {
    Object.keys(error).forEach(key => {
      content.push(`error - ${key}: ${error[key]}`);
    });
  }
  else {
    content.push(`error: ${error}`);
  }

  if(isObject(data)) {
    Object.keys(data).forEach(key => {
      if(isObject(data[key])) {
        Object.keys(data[key]).forEach(ObjKey => {
          if(!isFunction(data[key][ObjKey])) {
            content.push(`${key} - ${ObjKey}: ${data[key][ObjKey]}`);
          }
        });
      }
      else {
        content.push(`${key}: ${data[key]}`);
      }
    });
  }
  content.push("------------");
  // console.log('sendErrorDiscord - content.lengt: ', content.join("\n").length);
  // console.log('sendErrorDiscord - content: ', content.join("\n"));
  jsonPost(discordUrl, { data: { "content": content.join("\n") } })
  .catch(err => {
    console.log(err.content || err);
  })
};
