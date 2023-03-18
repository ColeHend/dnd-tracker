const auth = (req, res, next) => {
  if (!req.session.user_id) {
    console.log("session:", req.session);
    res.status(401).redirect("/");
  } else {
    console.log("User:", req.session.user_id);
    next();
  }
};
module.exports = auth;
