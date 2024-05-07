const { authJwt } = require("../middlewares");
const controller = require("../controllers/comment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/api/comments', authJwt.verifyToken, controller.getAllComments);
  app.get('/api/comment', authJwt.verifyToken, controller.getCommentById);// /api/comment?p=6569e7b4cc179cbd35515f93&c=comment_2
  app.get('/api/comments/:email', controller.getCommentsByEmail);
  app.get('/api/myComment', authJwt.verifyToken, controller.getMyComments);
  app.post('/api/comment', authJwt.verifyToken, controller.postComment);
  app.put('/api/comment', authJwt.verifyToken, controller.updateComment);
  app.delete('/api/comment', authJwt.verifyToken, controller.deleteCommentById);
};
