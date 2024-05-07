const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signinWithEmail", controller.signinWithEmailForTest);

  app.post("/api/auth/signout", controller.signout);

  app.post("/api/auth/login", controller.login);
};
