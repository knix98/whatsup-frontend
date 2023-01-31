// * wud automatically export all the named exports from './constants' in an object
// only named exports not the default export
export * from "./constants";

// 3 helper functions to add, get, remove items from local storage
export const setItemInSessionStorage = (key, value) => {
  if (!key || !value) {
    return console.error("Can not store in Local Storage");
  }

  const valueToStore =
    typeof value !== "string" ? JSON.stringify(value) : value;

  sessionStorage.setItem(key, valueToStore);
};

export const getItemFromSessionStorage = (key) => {
  if (!key) {
    return console.error("Cannot get the value from Local Storage");
  }

  return sessionStorage.getItem(key);
};

export const removeItemFromSessionStorage = (key) => {
  if (!key) {
    return console.error("Cannot find the value in Local Storage");
  }

  sessionStorage.removeItem(key);
};

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
