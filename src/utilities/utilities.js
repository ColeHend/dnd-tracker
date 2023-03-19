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

module.exports = {
  getLocalInfo,
  setLocalInfo,
  clearLocalInfo,
};
