const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

exports.getAllComments = async (req, res) => {
  try {
    const posts = await Post.find();
    const commentList = posts.map((e) => ({
      post_id: e._id,
      comment: e.comments
    }));
    res.json(commentList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error' });
  }
};

exports.getCommentsByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const posts = await Post.find();
    // Lọc ra danh sách các comment có địa chỉ email trùng với địa chỉ email đầu vào
    const matchingComments = posts.reduce((acc, post) => {
      const commentsWithEmail = post.comments.filter((comment) => comment.email === email);
      if (commentsWithEmail.length > 0) {
        // Nếu có ít nhất một comment có địa chỉ email trùng, thêm thông tin vào mảng kết quả
        acc.push({
          post_id: post._id,
          comments: commentsWithEmail
        });
      }
      return acc;
    }, []);

    res.json(matchingComments);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error' });
  }
};

exports.getCommentById = async (req, res) => {
  const commentId = req.query.c;
  const postId = req.query.p;
  try {
    const post = await Post.findById(postId);
    if (post) {
      const foundComment = post.comments.find((comment) => comment._id.toString() === commentId);

      if (foundComment) {
        res.status(200).json(foundComment); // Return the found comment
      } else {
        res.status(404).json({ error: 'Comment not found' });
      }
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.getMyComments = async (req, res) => {
  const email = req.email;
  try {
    const posts = await Post.find();
    // Lọc ra danh sách các comment có địa chỉ email trùng với địa chỉ email đầu vào
    const matchingComments = posts.reduce((acc, post) => {
      const commentsWithEmail = post.comments.filter((comment) => comment.email === email);
      if (commentsWithEmail.length > 0) {
        // Nếu có ít nhất một comment có địa chỉ email trùng, thêm thông tin vào mảng kết quả
        acc.push({
          post_id: post._id,
          comments: commentsWithEmail
        });
      }
      return acc;
    }, []);

    res.json(matchingComments);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error' });
  }
};

exports.postComment = async (req, res) => {
  const email = req.email;
  const postId = req.body.post_id;
  try {
    const post = await Post.findById(postId);

    if (post) {
      const comment = new Comment({
        email: email,
        comment_content: req.body.content,
        created_at: Date.now(),
        reating: []
      });
      post.comments.push(comment);
      // Lưu bài đăng đã cập nhật
      const updatedPost = await Post.updateOne({ _id: postId }, { $set: post });
      if (updatedPost.acknowledged && updatedPost.modifiedCount > 0) {
        return res.json({ comment });
      }
      res.json(updatedPost);
    } else {
      res.status(404).json("Post not found");
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error', error });
  }
};

exports.updateComment = async (req, res) => {
  const email = req.email;
  const postId = req.body.post_id;
  const commentId = req.body.comment_id;
  try {
    // Tìm bài đăng theo ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.comments.forEach((e, i) => {
      if (e._id.toString() === commentId) {
        post.comments[i].comment_content = req.body.content || post.comments[i].comment_content;
        post.comments[i].rating = req.body.rating || post.comments[i].rating;
      }
    });
    // Lưu bài đăng đã cập nhật
    const updatedPost = await Post.updateOne({ _id: postId }, { $set: post });
    if (updatedPost.acknowledged && updatedPost.modifiedCount > 0) {
      return res.json({ "status": "update success", doc_change: updatedPost.modifiedCount });
    }
    res.json(updatedPost);
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi
    console.log(error)
    return res.status(500).json({ error: 'Failed to update post' });
  }
};

exports.deleteCommentById = async (req, res) => {
  const email = req.email;
  const postId = req.body.post_id;
  const commentId = req.body.comment_id;

  try {
    // Tìm bài đăng theo ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const foundComment = post.comments.findIndex((comment) => {
      return comment._id.toString() === commentId;
    });
    if (foundComment === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    post.comments.splice(foundComment, 1);
    const updatedPost = await Post.updateOne({ _id: postId }, { $set: post });

    if (updatedPost.acknowledged && updatedPost.modifiedCount > 0) {
      return res.json({ "status": "delete success", doc_drop: updatedPost.modifiedCount });
    }
    res.json(updatedPost);
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi
    console.log(error)
    return res.status(500).json({ error: 'Failed to update post' });
  }
};