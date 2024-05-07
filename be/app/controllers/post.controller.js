const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Post = require('../models/post.model');

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error' });
  }
};

exports.getPostsByEmail = async (req, res) => {
  const email = req.email;
  try {
    const posts = await Post.find({ email });
    if (posts && posts.length > 0) {
      res.json(posts); // Return an array of posts
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};


exports.getPostById = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (post) {
      res.status(201).json(post); // Return an array of posts
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.getMyPosts = async (req, res) => {
  const email = req.email;
  try {
    const posts = await Post.find({ email });
    if (posts && posts.length > 0) {
      res.json(posts); // Return an array of posts
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.postContent = async (req, res) => {
  const email = req.email;

  try {
    const user = await User.findOne({ email });
    if (user) {
      // post bài tại đây
      const postData = {
        email: email,
        title: req.body.title,
        type: req.body.type,
        content: req.body.content,
        created_at: Date.now(),
        updated_at: Date.now(),
        likes: [],
        views: 0,
        comments: [],
        is_active: true,
        inappropriate_content_reports: [],
        tags: req.body.tags || [], // Có thể là một mảng rỗng nếu không có tags
        reason: req.body.reason || null,
      };
      // Tạo một đối tượng Post mới từ dữ liệu
      const newPost = new Post(postData);

      // Lưu đối tượng vào cơ sở dữ liệu
      const savedPost = await newPost.save();

      // Trả về kết quả (có thể trả về thông báo thành công, đối tượng post đã tạo, hoặc bất cứ điều gì khác tùy thuộc vào yêu cầu của bạn)
      return res.status(201).json(savedPost);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error', error });
  }
};

exports.updatePostById = async (req, res) => {
  const email = req.email;

  const postId = req.params.postId; // Lấy ID từ request parameters
  console.log(postId);
  try {
    // Tìm bài đăng theo ID
    const existingPost = await Post.findById(postId);
    console.log(existingPost);
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Cập nhật thông tin bài đăng
    const updateData = {
      title: req.body.title || existingPost.title,
      type: req.body.type || existingPost.type,
      content: req.body.content || existingPost.content,
      updated_at: Date.now(),
      likes: req.body.like || existingPost.likes,
      views: req.body.views || existingPost.views,
      comments: req.body.comments || existingPost.comments,
      is_active: req.body.is_active || existingPost.is_active,
      inappropriate_content_reports: req.body.inappropriate_content_reports || existingPost.inappropriate_content_reports,
      tags: req.body.tags || existingPost.tags,
      reason: req.body.reason || existingPost.reason,

    };

    // Lưu bài đăng đã cập nhật
    const updatedPost = await Post.updateOne({ _id: postId }, { $set: updateData });
    // Trả về kết quả (có thể trả về bài đăng đã cập nhật hoặc thông báo thành công tùy thuộc vào yêu cầu của bạn)
    return res.status(200).json(updatedPost);
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi
    console.log(error)
    return res.status(500).json({ error: 'Failed to update post' });
  }
};


exports.deletePostById = async (req, res) => {
  const email = req.email;

  const postId = req.params.postId; // Lấy ID từ request parameters

  try {
    // Tìm bài đăng theo ID
    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    existingPost.id = req.params.id;

    // Lưu bài đăng đã cập nhật
    const deletedPost = await existingPost.deleteOne();

    // Trả về kết quả (có thể trả về bài đăng đã cập nhật hoặc thông báo thành công tùy thuộc vào yêu cầu của bạn)
    return res.status(200).json(deletedPost);
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi
    return res.status(500).json({ error: 'Failed to update post' });
  }
};