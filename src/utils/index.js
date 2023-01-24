// * wud automatically export all the named exports from './constants' in an object
// only named exports not the default export
export * from "./constants";

//function to convert form data into urlencoded string
//params is an object(the form body)
export const getFormBody = (params) => {
  let formBody = [];

  //looping over every key present in params
  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%20123

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&"); // 'username=aakash&password=123213'
};
