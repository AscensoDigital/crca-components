import { jsonPost } from "./api-utils.js";
import { isFunction, isObject } from "./data-utils.js";


const recursionObject2Array = (obj, keyBase = '') => {
  const ret = [];
  const strKeyBase = `${keyBase.length ? `${keyBase} - ` : ''}`;
  if(isObject(obj) && Object.keys(obj).length ) {
    Object.keys(obj).forEach(key => {
      if(isObject(obj[key])) {
        ret.push(...recursionObject2Array(obj[key], `${strKeyBase}${key}`));
      }
      else if(!isFunction(obj[key])){
        ret.push(`${strKeyBase}${key}: ${obj[key]}`);
      }
    });
  }
  else if(!isFunction(obj) && !isObject(obj)) {
    ret.push(`${keyBase}: ${obj}`);
  }
  return ret;
}

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
  if(error.name!==undefined) {
    content.push(`error - name: ${error.name}`);
  }
  if(error.message!==undefined) {
    content.push(`error - message: ${error.message}`);
  }
  if(error.fileName!==undefined) {
    content.push(`error - fileName: ${error.fileName}`);
  }
  if(error.lineNumber!==undefined) {
    content.push(`error - lineNumber: ${error.lineNumber}`);
  }
  if(error.columnNumber!==undefined) {
    content.push(`error - columnNumber: ${error.columnNumber}`);
  }
  if(error.stack!==undefined && error.stack.length<1500) {
    content.push(`error - stack: ${error.stack}`);
  }
  const arrError = recursionObject2Array(error,'error');
  if(arrError.length) {
    content.push(...arrError);
  }

  const arrData = recursionObject2Array(data);
  if(arrData.length) {
    content.push(...arrData);
  }

  content.push("------------");
  // console.log('sendErrorDiscord - content.lengt: ', content.join("\n").length);
  // console.log('sendErrorDiscord - content: ', content.join("\n"));
  const contentStr = content.join("\n");
  if(contentStr.length>=2000) {
    contentStr = `${contentStr.substring(0,1995)}...`;
  }
  jsonPost(discordUrl, { data: { "content": contentStr } })
  .catch(err => {
    console.log(err.content || err);
  });
};
