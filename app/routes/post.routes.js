const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/api/posts', authJwt.verifyToken, controller.getAllPost);
  app.get('/api/post/:postId', authJwt.verifyToken, controller.getPostById);
  app.get('/api/posts/:email', controller.getPostsByEmail);
  app.get('/api/myPosts', authJwt.verifyToken, controller.getMyPosts);
  app.post('/api/post', authJwt.verifyToken, controller.postContent);
  app.put('/api/post/:postId', authJwt.verifyToken, controller.updatePostById);
  app.delete('/api/post/:postId', authJwt.verifyToken, controller.deletePostById);
};
