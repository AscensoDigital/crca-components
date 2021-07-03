import { isFunction, isObject, jsonPost } from "@ascenso/crca-utils";

export const sendErrorDiscord = (
  discordUrl,
  error,
  data = {},
  tag = null,
) => {
  // console.log('Process Error - discordUrl: ', discordUrl);
  // console.log('Process Error - error: ', error);
  // console.log('Process Error - data: ',data);
  // console.log('Process Error - tag: ',tag);
  const content = [`tag: ${tag}`];
  if(isObject(error)) {
    Object.keys(error).forEach(key => {
      content.push(`error - ${key}: ${error[key]}`);
    });
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
  console.log('Process Error - content.lengt: ', content.join("\n").length);
  // console.log('Process Error - content: ', content.join("\n"));
  return jsonPost(discordUrl, { data: { "content": content.join("\n") } });
};
