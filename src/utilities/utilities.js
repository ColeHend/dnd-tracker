const { default: Swal } = require("sweetalert2");

const getLocalInfo = () => {
  const user_id = window.localStorage.getItem("user_id");
  const username = window.localStorage.getItem("username");
  const user_password = window.localStorage.getItem("user_password");
  return { user_id, username, user_password };
};

const setLocalInfo = (user_id, username, user_password) => {
  window.localStorage.setItem("user_id", user_id);
  window.localStorage.setItem("username", username);
  window.localStorage.setItem("user_password", user_password);
};

const clearLocalInfo = () => {
  window.localStorage.removeItem("user_id");
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("user_password");
};

const objReturnString = (data)=>{
  return typeof data === 'string'? data : typeof data === 'object' ? JSON.stringify(data) : ''
}
const stringReturnObj = (data)=>{
  let toReturn = data
  if (typeof data === 'string' && (data.trim().charAt(0) === "[" || data.trim().charAt(0) === "{")) {
    toReturn = JSON.parse(data)
  }
  return toReturn
}

const closeSwalWindows = ()=>{
  Swal.close();
}

const resetThePage = ()=>{
  window.location.reload(true)
}

const removeObjectInArray = (array=[], key="project_id", identifier) => {
  return array.filter((value)=>value[key]!==identifier)
}

module.exports = {
  getLocalInfo,
  setLocalInfo,
  clearLocalInfo,
  removeObjectInArray,
  objReturnString,
  stringReturnObj,
  closeSwalWindows,
  resetThePage
};
